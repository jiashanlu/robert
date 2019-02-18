# from django.test import TestCase
# from selenium import webdriver
# from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
# from selenium.webdriver.common.keys import Keys
# from django.urls import reverse
#
#
#
# # import datetime
#
# from orders.models import Item, Address, Preference, Order, OrderItem, Topup
# from users.models import CustomUser
#
# class TestTopup(TestCase):
#     def setUp(self):
#         self.chrome = webdriver.Remote(
#             command_executor='http://selenium_hub:4444/wd/hub',
#             desired_capabilities=DesiredCapabilities.FIREFOX
#         )
#         self.chrome.implicitly_wait(10)
#         CustomUser.objects.create(username="test", email="1234@gmail.com", password="Aaa1234@123gfstr", email_confirmed=True)
#         # username = self.chrome.find_element_by_id('id_username2')
#         # password = self.chrome.find_element_by_id('id_password2')
#         # form = self.chrome.find_element_by_id('login-form')
#         # username.send_keys('test')
#         # password.send_keys('Aaa1234@123gfstr')
#         # form.click()
#         # self.assertIn("http://localhost:8000/", self.driver.current_url)
#
#
#
#     def test_topup_fire(self):
#         self.chrome.get("http://web:8000/account")
#         username = self.chrome.find_element_by_id('id_username2')
#         password = self.chrome.find_element_by_id('id_password2')
#         button = self.chrome.find_element_by_id('login-button')
#         username.send_keys('test')
#         password.send_keys('Aaa1234@123gfstr')
#         button.click()
#         self.chrome.implicitly_wait(10)
#         self.assertIn("web:8000/account", self.chrome.current_url)
#         # self.chrome.find_element_by_id('button-topup').click()
#         # self.chrome.findElement(By.cssSelector("input[type='email']")).send_keys('4242424242424242');
#
#     def tearDownClass(self):
#         self.chrome.implicitly_wait(10)
#         self.chrome.quit()
