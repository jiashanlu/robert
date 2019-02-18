from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth import login, authenticate
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from users.decorators import email_confirmed_required
from users.models import CustomUser, Membership
from geo.models import Area
import stripe
import json
stripe.api_key = "sk_test_EqFjnmGDUS4mc6nDl7DdtwIG"
# Create your views here.

def index(request):
    area = Area.objects.filter(is_activated=True)
    areas = [ obj.as_dict() for obj in area ]
    context = {
    "area": areas
    }
    return render(request, "orders/index.html", context)

def checkout(request):
    if request.method == "POST":
        date = request.POST['dateorder']
        order = json.loads(request.POST['order'])
        geocode = json.loads(request.POST['geocode'])
        total = json.loads(request.POST['total'])
        token = request.POST['stripeToken']
        str = request.POST['str']
        user = request.user
        user.first_name = request.POST['firstName']
        user.last_name = request.POST['LastName']
        user.phone_number = request.POST['phone']
        A = Address.objects.create(street = request.POST['inputAddress'], area = request.POST['area'], housing=request.POST['inputHousing'], apt_villa_nbr=request.POST['inputHousing2'],details=request.POST['details'],json_geocode = geocode)
        A.save()
        if A.housing == "VILLA":
            A.counpound_name = request.POST['inputHousing1']
            A.floor_nbr = ""
        else:
            A.floor_nbr = request.POST['inputHousing1']
            A.counpound_name = ""
        A.save()
        user.address = A
        P = Preference.objects.create(delivery_time = request.POST['timedelivery'], reception_type = request.POST['reception'])
        P.save()
        user.preference = P
        O = Order.objects.create(date=date, customer=user, delivery_preference=P, delivery_address=A, str=str)
        for i in order["items"]:
            if int(i["qty"]) > 0:
                OI = OrderItem.objects.create()
                OI.qty = int(i["qty"])
                OI.item = Item.objects.get(name=i["name"])
                OI.save()
                O.orderitem_set.add(OI)
        user.order.add(O)
        if order['default'] == True:
            user.default_order = O
        user.save()
        if user.balance <= O.total:
            charge = stripe.Charge.create(
            amount= int((O.total-user.balance)*100),
            currency='aed',
            description='test',
            source=token,
            metadata={"order_id" : O.id},
            )
            if charge.paid:
                O.is_paid = True
                O.payment_reference = charge.id
                O.save()
                user.balance = 0
                user.update_status()
                user.save()
        else:
            user.balance = user.balance - O.total
            user.save()
            O.payment_reference = O.date + "FB"
            user.update_status()
            O.save()
    return HttpResponseRedirect(reverse("order"))

@require_POST
def topup(request):
    if request.method == "POST":
        topup = int(request.POST['topup'])
        paid = Topup.objects.get(amount=topup).charge
        user = request.user
        token = request.POST['stripeToken']
        charge = stripe.Charge.create(
            amount= int(paid*100),
            currency='aed',
            description='test',
            source=token,
            metadata={"topup_id" : user.id},
        )
        if charge.paid:
            user.balance += topup
            user.save()
        context = {
        }
        return HttpResponseRedirect(reverse("account"))

@require_POST
def check(request):
    context = {
    }
    if request.method == "POST":
        if request.POST['inArea'] == "true-index":
            messages.success(request, "OK")
            return HttpResponseRedirect(reverse("order"))
        elif request.POST['inArea'] == 'true-confirm':
            return HttpResponse(status=204)
        else:
            return HttpResponseRedirect(reverse("notavailable"))
    # return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

@require_POST
def modify(request):
    link = request.POST['page']
    user = request.user
    items = Item.objects.all()
    order = user.order_tommorow_done
    amount = order.total
    user.balance += amount
    order.is_cancelled=True
    order.save()
    user.update_status()
    user.save()
    if link == 'AO':
        return HttpResponseRedirect(request.META.get('HTTP_REFERER')+'#AO')
    else:
        return HttpResponseRedirect(reverse("order"))

@require_POST
def DO_update(request):
    user = request.user
    order = json.loads(request.POST['default_order'])
    O = Order.objects.create()
    for i in order["items"]:
        OI = OrderItem.objects.create()
        OI.qty = int(i["qty"])
        OI.item = Item.objects.get(name=i["name"])
        OI.save()
        O.orderitem_set.add(OI)
    user.default_order=O
    user.save()
    return HttpResponseRedirect(request.META.get('HTTP_REFERER')+'#AO')

@require_POST
def AO(request):
    user = request.user
    if user.AO_activated:
        user.AO_activated = False
    else:
        user.AO_activated = True
    user.save()
    return HttpResponseRedirect('/account#AO')






def order(request):
    user = request.user
    items = Item.objects.all()
    # items_as_dict = [ obj.as_dict() for obj in items ]
    context = {
    # "items_as_dict": items_as_dict,
    "membership" : Membership.objects.all().order_by('discount').reverse(),
    "items": items,
    }
    return render(request, "orders/order-template.html", context)

def notavailable(request):
    context = {
    }
    return render(request, "orders/not-available.html", context)


@login_required(login_url='/login')
@email_confirmed_required
def confirm(request):
    area = Area.objects.filter(is_activated=True)
    areas = [ obj.as_dict() for obj in area ]
    user = request.user
    context = {
    # "user": user,
    "area": areas,
    }
    return render(request, "orders/confirm.html", context)
