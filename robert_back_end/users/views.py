from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .forms import CustomUserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login as auth_login
from django.contrib.auth import authenticate
from users.forms import CustomUserCreationForm
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_encode
from django.utils.http import urlsafe_base64_decode
from .tokens import account_activation_token
from .models import CustomUser
from orders.models import Topup, Item
from geo.models import Area
import datetime
from users.decorators import email_confirmed_required, not_logged_in
from django.contrib.auth.decorators import login_required, user_passes_test




# Create your views here.
@user_passes_test(not_logged_in, login_url='logout')
def login(request):
    form = AuthenticationForm()
    context = {
        'login_form': form,
        'signup_form': CustomUserCreationForm(),
    }
    return render(request, "registration/login.html", context)

def confirm_email(request):
    if request.method == "POST":
        user = request.user
        current_site = get_current_site(request)
        subject = 'Activate Your Robert Account'
        message = render_to_string('registration/account_activation_email.html', {
            'user': user,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)).decode(),
            'token': account_activation_token.make_token(user),
        })
        user.email_user(subject, message)
        return HttpResponse('Please confirm your email address to complete the registration')
    return render(request, "registration/resend_email_confirm.html")

@user_passes_test(not_logged_in, login_url='/')
def signup(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.email_confirmed = False
            user.order_default_origin()
            user.save()
            current_site = get_current_site(request)
            subject = 'Activate Your Robert Account'
            message = render_to_string('registration/account_activation_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)).decode(),
                'token': account_activation_token.make_token(user),
            })
            user.email_user(subject, message)
            return HttpResponse('Please confirm your email address to complete the registration')
    context = {
        'signup_form': form,
        'login_form': AuthenticationForm(),
    }
    return render(request, "registration/login.html", context)

@user_passes_test(not_logged_in, login_url='/')
def signin(request):
    form = AuthenticationForm()
    form.hash =""
    form.next =""
    if request.method == "POST":
        hash = request.POST['hash']
        next = request.POST['next']
        form = AuthenticationForm(request=request, data=request.POST)
        form.hash =""
        form.next =""
        if hash :
            form.hash = hash
        if next :
            form.next = next
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                auth_login(request, user)
                if next:
                    return HttpResponseRedirect(next)
                else:
                    return HttpResponseRedirect(reverse("order"))
    context = {
        'signup_form': CustomUserCreationForm(),
        'login_form': form,
        'hash': form.hash,
        'next': form.next,
    }
    return render(request, "registration/login.html", context)

def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.email_confirmed = True
        user.save()
        auth_login(request, user)
        return HttpResponseRedirect(reverse("confirm"))
    else:
        return render(request, "registration/account_activation_invalid.html")

@login_required(login_url='/login#first')
@email_confirmed_required
def account(request):
    items = Item.objects.all()
    user = request.user
    area = Area.objects.filter(is_activated=True)
    areas = [ obj.as_dict() for obj in area ]
    D = datetime.date.today() + datetime.timedelta(1)
    orders = user.order.all()
    orders = orders.exclude(is_cancelled=True, date__lt=D)
    orders = orders.order_by('id').reverse()[:10]

    context = {
        "items": items,
        "area": areas,
        'topup': Topup.objects.all(),
        'login_form': AuthenticationForm(),
        'signup_form': CustomUserCreationForm(),
        'orders': orders,
    }
    return render(request, "registration/account.html", context)
