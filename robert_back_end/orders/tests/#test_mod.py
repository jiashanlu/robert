from django.test import TestCase
from django.urls import reverse
import datetime

from orders.models import Item, Address, Preference, Order, OrderItem, Topup
from users.models import CustomUser

class OrdersModelsTests(TestCase):

    def setUp(self):
        CustomUser.objects.create(username="test", email="1234@gmail.com", password=1234)
        user = CustomUser.objects.get(username="test")
        user.order_default_origin()
        Item.objects.create(type="Croissant", name="Croissant", price="54.58")
        I = Item.objects.get(price="54.58")
        A = Address.objects.create(street="mon adresse", area="mon quartier", housing="VILLA")
        A.floor_nbr = 14
        A.counpound_name = "counpound"
        A.apt_villa_nbr = 30
        A.details = "some details"
        A.save()
        Preference.objects.create(delivery_time = "AM", reception_type="R")
        P = Preference.objects.get(delivery_time = "AM")
        Order.objects.create(date= datetime.date.today() + datetime.timedelta(1), customer= user, delivery_address = A, delivery_preference = P, str="ceci est un test")
        O = Order.objects.get(str="ceci est un test")
        OrderItem.objects.create(order=O,item=I)
        Topup.objects.create(amount=12, charge=8)


    def test_item_model(self):
        item = Item.objects.get(type="Croissant")
        self.assertTrue(isinstance(item, Item))
        self.assertEquals(item.__str__(), f"{item.type}, {item.name}, {item.price}")

    def test_address_model(self):
        address = Address.objects.get(id=1)
        self.assertTrue(isinstance(address, Address))
        self.assertEquals(address.__str__(), f"{address.street}, {address.area}")

    def test_preference_model(self):
        preference = Preference.objects.get(delivery_time = "AM")
        self.assertTrue(isinstance(preference, Preference))
        self.assertEquals(preference.__str__(), f"{preference.get_delivery_time_display()}/ {preference.get_reception_type_display()}")

    def test_order_model(self):
        order = Order.objects.get(str="ceci est un test")
        self.assertTrue(isinstance(order, Order))
        self.assertEquals(order.__str__(), f"{order.id}, {order.str}, {order.total}, {order.date}")

    def test_oi_model(self):
        oi = OrderItem.objects.get(order=Order.objects.get(str="ceci est un test"))
        self.assertTrue(isinstance(oi, OrderItem))
        self.assertEquals(oi.__str__(), f"{oi.qty}, {oi.item}")

    def test_topup_model(self):
        topup = Topup.objects.get(amount=12)
        self.assertTrue(isinstance(topup, Topup))
        self.assertEquals(topup.__str__(), f"{topup.amount} for {topup.charge}")
