from django.contrib.auth.decorators import login_required, user_passes_test
from .models import CustomUser

def email_confirmed_required(function):
    dec = user_passes_test(lambda u: u.email_confirmed, 'confirm_email', '')
    return dec(function)

def not_logged_in(user):
    return not user.is_authenticated
