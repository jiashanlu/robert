from django.urls import path
from django.conf.urls import url, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("check", views.check, name="check"),
    path("order", views.order, name="order"),
    path("notavailable", views.notavailable, name="notavailable"),
    path("confirm", views.confirm, name="confirm"),
    path("checkout", views.checkout, name="checkout"),
    path("modify", views.modify, name="modify"),
    path("topup", views.topup, name="topup"),
    path("DO_update", views.DO_update, name="DO_update"),
    path("AO", views.AO, name="AO"),
]
