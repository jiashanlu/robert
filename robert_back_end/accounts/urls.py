from django.urls import path, include
from .api import FacebookLogin

urlpatterns = [
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
]
