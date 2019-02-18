from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser, Membership

# Register your models here.


# class CustomUserAdmin(UserAdmin):
#     # add_form = CustomUserCreationForm
#     # form = CustomUserChangeForm
#     # model = CustomUser
#     # list_display = ['email', 'username', 'email_confirmed']

admin.site.register(CustomUser)
admin.site.register(Membership)
