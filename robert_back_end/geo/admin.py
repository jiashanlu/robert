from django.contrib import admin
from .models import *
# Register your models here.


class AreaAdmin(admin.StackedInline):
    model = Area
    model = Coordinate
class CoordinateAdmin(admin.StackedInline):
    model = Coordinate


admin.site.register(Area)
admin.site.register(Coordinate)
