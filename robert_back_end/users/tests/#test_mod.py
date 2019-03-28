from django.test import TestCase
import datetime
from users.models import Membership, CustomUser
from orders.models import Order, Address, Preference
from orders.tests.test_mod import OrdersModelsTests

class UsersModelTests(TestCase):

    def setUp(self):
        OrdersModelsTests.setUp(self)
        Membership.objects.create(name="test", goal="0.3", discount="0.05")
        user = CustomUser.objects.get(username="test")
        O = Order.objects.get(str="ceci est un test")
        user.order.add(O)
        user.save()

    def test_membership_model(self):
        membership = Membership.objects.get(name='test')
        self.assertTrue(isinstance(membership, Membership))
        self.assertEquals(membership.__str__(), membership.name)

    def test_CustomUser_model(self):
        user = CustomUser.objects.get(username="test")
        self.assertTrue(isinstance(user, CustomUser))
        self.assertEquals(user.__str__(), '1234@gmail.com')

    def test_CustomUser_OTD_model(self):
        user = CustomUser.objects.get(username="test")
        test = user.order_tommorow_done
        self.assertTrue(test)

    def test_CustomUser_OTD2_model(self):
        user = CustomUser.objects.get(username="test")
        order = user.order.get(str="ceci est un test")
        order.delete()
        test = user.order_tommorow_done
        self.assertFalse(test)

    def test_CustomUser_OTD3_model(self):
        user = CustomUser.objects.get(username="test")
        order = user.order.get(str="ceci est un test")
        order.is_cancelled = True
        order.save()
        test = user.order_tommorow_done
        self.assertFalse(test)

    def test_CustomUser_US_model(self):
        user = CustomUser.objects.get(username="test")
        user.update_status()
        self.assertEquals(user.membership, None)

    def test_CustomUser_US_model(self):
        date= datetime.date.today()
        user = CustomUser.objects.get(username="test")
        A = Address.objects.get(details = "some details")
        P = Preference.objects.get(delivery_time = "AM")
        O1 = Order.objects.create(date = date+datetime.timedelta(-1), customer = user, delivery_address = A , delivery_preference = P, str="test")
        O2 = Order.objects.create(date = date+datetime.timedelta(-2), customer = user, delivery_address = A , delivery_preference = P, str="test2")
        user.order.add(O1,O2)
        user.save()
        user.update_status()
        self.assertFalse(user.membership == None)

    def test_CustomUser_US2_model(self):
        date= datetime.date.today()
        user = CustomUser.objects.get(username="test")
        A = Address.objects.get(details = "some details")
        P = Preference.objects.get(delivery_time = "AM")
        O1 = Order.objects.create(date = date+datetime.timedelta(-1), customer = user, delivery_address = A , delivery_preference = P, str="test")
        user.order.add(O1)
        user.save()
        membership = Membership.objects.get(name='test')
        membership.goal=0.28
        membership.save()
        user.update_status()
        self.assertTrue(user.membership.name == "test")

    def test_CustomUser_US3_model(self):
        date= datetime.date.today()
        user = CustomUser.objects.get(username="test")
        A = Address.objects.get(details = "some details")
        P = Preference.objects.get(delivery_time = "AM")
        O1 = Order.objects.create(date = date+datetime.timedelta(-1), customer = user, delivery_address = A , delivery_preference = P, str="test")
        O3 = Order.objects.create(date = date+datetime.timedelta(-29), customer = user, delivery_address = A , delivery_preference = P, str="test3")
        user.order.add(O1,O3)
        user.save()
        membership = Membership.objects.get(name='test')
        membership.goal=0.28
        membership.save()
        user.update_status()
        self.assertFalse(user.membership != None)
