from django.contrib import admin

from .models import *
from users.models import CustomUser
# Register your models here.

class ItemInline(admin.StackedInline):
    model = Order.ordered_item.through
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    inlines = [ItemInline]


admin.site.register(Item)
admin.site.register(Address)
admin.site.register(Topup)
admin.site.register(Order, OrderAdmin)
