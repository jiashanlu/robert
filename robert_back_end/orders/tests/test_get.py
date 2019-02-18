from django.http import HttpRequest
from django.test import TestCase
from django.urls import reverse

from orders import views
from orders.models import *

class HomePageTests(TestCase):

    def test_home_page_status_code(self):
        response = self.client.get('/')
        self.assertEquals(response.status_code, 200)

    def test_view_url_by_name(self):
        response = self.client.get(reverse('index'))
        self.assertEquals(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get(reverse('index'))
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'orders/index.html')

    def test_home_page_contains_correct_html(self):
        response = self.client.get('/')
        self.assertContains(response, 'Robert - Best Bread Delivery')

    def test_home_page_does_not_contain_incorrect_html(self):
        response = self.client.get('/')
        self.assertNotContains(
            response, 'Hi there! I should not be on the page.')

class CheckoutTests(TestCase):

    def test_view_redirect_correctly(self):
        response = self.client.get(reverse('checkout'))
        self.assertEquals(response.status_code, 302)
        self.assertRedirects(response, '/order', status_code=302)

class TopupTests(TestCase):

    def test_view_is_forbidden(self):
        response = self.client.get(reverse('topup'))
        self.assertEquals(response.status_code, 405)

class CheckTests(TestCase):

    def test_view_is_forbidden(self):
        response = self.client.get(reverse('check'))
        self.assertEquals(response.status_code, 405)

class ModifyTests(TestCase):

    def test_view_is_forbidden(self):
        response = self.client.get(reverse('modify'))
        self.assertEquals(response.status_code, 405)

class ConfirmTests(TestCase):

    def test_view_is_forbidden(self):
        response = self.client.get(reverse('confirm'))
        self.assertEquals(response.status_code, 302)
