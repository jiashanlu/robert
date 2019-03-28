from rest_framework import serializers
from users.models import CustomUser
from django.contrib.auth import authenticate
from orders.serializers import AddressSerializer, PreferenceSerializer

# user serializer


class UserDetailsSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    preference = PreferenceSerializer()
    class Meta:
        model = CustomUser
        fields = '__all__'

# register serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user

# login serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
