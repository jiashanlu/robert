from rest_framework import serializers
from geo.models import Area, Coordinate


class CoordinateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinate
        fields = ('lat', 'lng')


class AreaSerializer(serializers.ModelSerializer):
    co = CoordinateSerializer(many=True, read_only=True)

    class Meta:
        model = Area
        fields = ('co', 'name', 'is_activated')
