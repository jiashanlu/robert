from django.urls import path, include
from django.conf.urls import url
from . import views



urlpatterns = [
    path('accounts/', include('django.contrib.auth.urls')),
    path("login/", views.login, name="login"),
    path("signup", views.signup, name="signup"),
    path("signin", views.signin, name="signin"),
    path("confirm_email", views.confirm_email, name="confirm_email"),
    path("account", views.account, name="account"),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.activate, name='activate'),]
