from django.contrib.auth.models import AbstractUser
from django.db import models
from orders.models import Address, Preference, Order, Item, OrderItem
import datetime
from django.db.models import FilePathField, FileField


# Create your models here.

class Membership(models.Model):
    name = models.CharField(max_length=64)
    goal = models.DecimalField(max_digits=3, decimal_places=2)
    discount = models.DecimalField(max_digits=3, decimal_places=2)
    pic = FileField(upload_to='member_pic/', null=True)

    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    # add additional fields in here
    AO_activated = models.BooleanField(default=False)
    AO_order_list = models.ManyToManyField(Order, blank=True, related_name="AO_order_list")
    membership = models.ForeignKey(Membership, on_delete=models.SET_NULL, related_name="membership", blank=True, null=True)
    ratio = models.DecimalField(max_digits=3, decimal_places=2, default = 0)
    email_confirmed = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=10,null=True,blank=True)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, related_name="address", blank=True, null=True)
    preference = models.ForeignKey(Preference, on_delete=models.SET_NULL, related_name="preference", blank=True, null=True)
    order = models.ManyToManyField(Order, blank=True, related_name="order")
    default_order = models.ForeignKey(Order, on_delete=models.SET_NULL, related_name="default_order", blank=True, null=True)
    balance = models.DecimalField(max_digits=7, decimal_places=2, default=0)


    @property
    def order_tommorow_done(self):
        newDate = datetime.date.today() + datetime.timedelta(1)
        orders = self.order.all()
        for D in orders :
            if D.date == newDate and D.is_cancelled == False :
                return D

    # def order_tommorow_done_object(self):
    #     if self.order_tommorow_done:
    #         return "yes"
    #     else:
    #         return "false"




    def order_default_origin(self):
        items = Item.objects.all()
        order = Order.objects.create(str="default_origin")
        order.save()
        for item in items:
            OI = OrderItem.objects.create(item=item, qty=0)
            OI.save()
            order.orderitem_set.add(OI)
        self.default_order = order
        self.save()

    def update_status(self):
        date = datetime.date.today() + datetime.timedelta(1)
        date_min = date + datetime.timedelta(-30)
        orders = self.order.filter(is_cancelled=False, date__lte=date, date__gte=date_min)
        if orders:
            member = False
            order_min = orders.order_by('date')[0]
            if (date-order_min.date).days > 7 :
                period = (date-order_min.date).days
            else :
                period = 7
            membership_list = Membership.objects.all().order_by('goal')
            ratio = len(orders) / period
            self.ratio = ratio
            for m in membership_list:
                if ratio >= m.goal:
                    self.membership = m
                    member = True
            if not member:
                self.membership = None
            self.save()



    def __str__(self):
        return self.email
