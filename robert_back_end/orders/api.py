from orders.models import Item, Order, Preference, Address
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from .serializers import ItemSerializer, OrderSerializer
from rest_framework.response import Response
from rest_framework import status


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ItemSerializer


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = OrderSerializer

    def get_queryset(self):
        return self.request.user.orders.all()

    def perform_create(self, serializer):
        user_details = self.request.data['user']
        preference_default = self.request.data['default']['preference_default']
        address_default = self.request.data['default']['address_default']
        serializer.save(customer=self.request.user)  # serializer
        order = Order.objects.get(id=serializer['id'].value)
        user = self.request.user
        user.orders.add(order)  # add order to user
        user.phone_number = user_details['phone_number']  # add details
        user.first_name = user_details['first_name']
        user.last_name = user_details['last_name']
        user.save()
        if preference_default:
            preference = Preference.objects.get(
                id=serializer['delivery_preference']['id'].value)
            user.preference = preference
            user.save()
        if address_default:
            address = Address.objects.get(
                id=serializer['delivery_address']['id'].value)
            user.address = address
            user.save()
