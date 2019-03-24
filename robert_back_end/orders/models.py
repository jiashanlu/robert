from django.db import models
from django.contrib.postgres.fields import JSONField
from django.apps import apps


# Create your models here.
class Item (models.Model):
    type = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    # def save(self, *args, **kwargs):
    #     CustomUser = apps.get_model('users', 'CustomUser')
    #     users = CustomUser.objects.all()
    #     super(Item, self).save(*args, **kwargs)
    #     for U in users:
    #         items = U.default_order.ordered_item.all()
    #         if self not in items:
    #             OI = OrderItem.objects.create(item=self, qty=0)
    #             OI.save()
    #             U.default_order.orderitem_set.add(OI)
    #             U.save()

    # def as_dict(self):
    #     return {
    #         "type": self.type,
    #         "name": self.name,
    #         "price": self.price
    #     }

    def __str__(self):
        return f"{self.type}, {self.name}, {self.price}"


class Address (models.Model):
    HOUSING_CHOICES = (
        ('Villa', 'villa'),
        ('Appartment', 'appartment'),
    )
    street_number = models.IntegerField()
    street = models.CharField(max_length=64)
    area = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    housing = models.CharField(
        max_length=5, choices=HOUSING_CHOICES, default='VILLA')
    counpound_building_name = models.CharField(max_length=64, null=True)
    apt_villa_nbr = models.IntegerField(null=True)
    details = models.CharField(max_length=512, null=True)
    geocode = models.CharField(max_length=64, null=True)
    user = models.ForeignKey(
        'users.CustomUser', on_delete=models.CASCADE, related_name="user_address", null=True)

    def __str__(self):
        return f"{self.street}, {self.area}"


class Preference (models.Model):
    DELIVERY_CHOICES = (
        ('4:00 - 7:00', 'from 4:00 a.m. to 7:00 a.m.'),
        ('10:30 - 11:30', 'from 10:30 a.m. to 11:30 a.m.'),
        ('18:00 - 20:00', 'from 18:00 p.m. to 20:00 p.m.'),
    )
    RECEPTION_CHOICES = (
        ('ring the bell', 'ring the bell'),
        ('let in the front door', 'front door'),
    )
    delivery_choice = models.CharField(
        max_length=60, choices=DELIVERY_CHOICES)
    reception_choice = models.CharField(
        max_length=60, choices=RECEPTION_CHOICES)

    def __str__(self):
        return f"{self.get_delivery_choice_display()}/ {self.get_reception_choice_display()}"


class Order (models.Model):
    ordered_item = models.ManyToManyField(
        Item, blank=True, through="OrderItem", related_name="ordered_item")
    is_cancelled = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)
    date = models.DateField(blank=True, null=True)
    payment_reference = models.CharField(max_length=64, null=True)
    customer = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE,
                                 related_name="customer", unique_for_date="date", null=True)
    delivery_address = models.ForeignKey(
        Address, on_delete=models.CASCADE, related_name="delivery_address", null=True)
    delivery_preference = models.ForeignKey(
        Preference, on_delete=models.CASCADE, related_name="delivery_preference", null=True)
    str = models.CharField(max_length=512, null=True)

    @property
    def total(self):
        result = 0
        for OI in self.orderitem_set.all():
            result = result + (OI.qty * OI.item.price)
        if self.customer:
            if self.customer.membership:
                discount = self.customer.membership.discount
                discounted = round((discount * result), 2)
                result = result - discounted
        return result

    def __str__(self):
        return f"{self.id}, {self.date}"


class OrderItem (models.Model):
    order = models.ForeignKey(Order, null=True, on_delete=models.CASCADE)
    qty = models.IntegerField(default=1, null=True)
    item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name="item", null=True)

    def __str__(self):
        return f"{self.qty}, {self.item}"


class Topup (models.Model):
    amount = models.IntegerField()
    charge = models.IntegerField()

    def __str__(self):
        return f"{self.amount} for {self.charge}"
