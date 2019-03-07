from django.urls import path
from django.conf.urls import url, include
from . import views
from rest_framework import routers
from .api import AreaViewSet

router = routers.DefaultRouter()
router.register('api/areas', AreaViewSet, 'areas')

urlpatterns = [
] + router.urls
