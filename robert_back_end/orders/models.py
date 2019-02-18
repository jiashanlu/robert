from django.db import models
from django.contrib.postgres.fields import JSONField
from django.apps import apps



# Create your models here.
class Item (models.Model):
    type = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def save(self, *args, **kwargs):
        CustomUser = apps.get_model('users', 'CustomUser')
        users = CustomUser.objects.all()
        super(Item, self).save(*args, **kwargs)
        for U in users:
            items = U.default_order.ordered_item.all()
            if self not in items:
                OI = OrderItem.objects.create(item=self, qty=0)
                OI.save()
                U.default_order.orderitem_set.add(OI)
                U.save()



    def as_dict(self):
        return {
            "type":self.type,
            "name":self.name,
            "price":self.price
        }

    def __str__(self):
        return f"{self.type}, {self.name}, {self.price}"

class Address (models.Model):
    HOUSING_CHOICES =(
        ('VILLA', 'villa'),
        ('APT', 'appartment'),
    )
    street = models.CharField(max_length=64)
    area = models.CharField(max_length=64)
    housing = models.CharField(max_length=5, choices=HOUSING_CHOICES, default='VILLA')
    floor_nbr = models.CharField(max_length=64,null=True)
    counpound_name = models.CharField(max_length=64,null=True)
    apt_villa_nbr = models.IntegerField(null=True)
    details = models.CharField(max_length=512,null=True)
    json_geocode = JSONField(null=True)

    def __str__(self):
        return f"{self.street}, {self.area}"

class Preference (models.Model):
    DELIVERY_CHOICES =(
        ('AM', 'from 4:00 a.m. to 6:00 a.m.'),
        ('NOON', 'from 11:00 a.m. to 12:00 p.m.'),
        ('PM', 'from 15:00 p.m. to 16:00 p.m.'),
    )
    RECEPTION_CHOICES =(
        ('R', 'ring the bell'),
        ('L', 'front door'),
    )
    delivery_time = models.CharField(max_length=4, choices=DELIVERY_CHOICES, default='AM')
    reception_type = models.CharField(max_length=1, choices=RECEPTION_CHOICES, default='L')

    def __str__(self):
        return f"{self.get_delivery_time_display()}/ {self.get_reception_type_display()}"


class Order (models.Model):
    ordered_item = models.ManyToManyField(Item, blank=True, through="OrderItem", related_name="ordered_item")
    is_cancelled = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)
    date = models.DateField(blank=True, null=True)
    payment_reference = models.CharField(max_length=64, null=True)
    customer = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, related_name="customer", unique_for_date= "date",null=True)
    delivery_address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name="delivery_address", null=True)
    delivery_preference = models.ForeignKey(Preference, on_delete=models.CASCADE, related_name="delivery_preference", null=True)
    str = models.CharField(max_length=512, null=True)

    @property
    def total(self):
        result=0
        for OI in self.orderitem_set.all():
            result = result + (OI.qty * OI.item.price)
        if self.customer:
            if self.customer.membership:
                discount = self.customer.membership.discount
                discounted = round((discount * result),2)
                result = result - discounted
        return result

    def __str__(self):
        return f"{self.id}, {self.str}, {self.total}, {self.date}"

class OrderItem (models.Model):
    order = models.ForeignKey(Order, null=True, on_delete=models.CASCADE)
    qty = models.IntegerField(default=1, null=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="item",null=True)

    def __str__(self):
        return f"{self.qty}, {self.item}"

class Topup (models.Model):
    amount = models.IntegerField()
    charge = models.IntegerField()

    def __str__(self):
        return f"{self.amount} for {self.charge}"
