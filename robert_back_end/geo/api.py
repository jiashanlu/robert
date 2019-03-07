from geo.models import Area
from rest_framework import viewsets, permissions
from .serializers import AreaSerializer


class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = AreaSerializer
