from django.db import models
from users.models import CustomUser

# Create your models here.


class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=50, blank=True)
    owner = models.ForeignKey(
        CustomUser, related_name='leads', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
