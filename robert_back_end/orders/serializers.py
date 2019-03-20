from rest_framework import serializers
from orders.models import Item, Order, OrderItem, Address, Preference


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = OrderItem
        fields = ('qty', 'item')


class OrderItemWriteSerializer(serializers.ModelSerializer):
    item = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all())

    class Meta:
        model = OrderItem
        fields = ('qty', 'item')


class OrderSerializer(serializers.ModelSerializer):
    delivery_address = AddressSerializer()
    delivery_preference = PreferenceSerializer()
    orderitem_set = OrderItemSerializer(read_only=True,
                                        many=True, required=False)
    orderitem = OrderItemWriteSerializer(many=True, required=False)

    class Meta:
        model = Order
        exclude = ('ordered_item',)
        extra_kwargs = {'orderitem': {'write_only': True}}

    def create(self, validated_data):
        ordered_items_data = validated_data.pop('orderitem')
        delivery_preference_data = validated_data.pop('delivery_preference')
        delivery_address_data = validated_data.pop('delivery_address')
        preference = Preference.objects.create(**delivery_preference_data)
        address = Address.objects.create(**delivery_address_data)
        order = Order.objects.create(
            delivery_preference=preference, delivery_address=address, **validated_data)
        for ordered_item in ordered_items_data:
            OrderItem.objects.create(order=order, **ordered_item)
        return order
