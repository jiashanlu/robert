from django.urls import path
from django.conf.urls import url, include
from . import views
from rest_framework import routers
from .api import ItemViewSet, OrderViewSet

router = routers.DefaultRouter()
router.register('api/items', ItemViewSet, 'items')
router.register('api/order', OrderViewSet, 'order')

urlpatterns = [
] + router.urls
