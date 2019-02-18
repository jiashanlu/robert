from django.db import models

# Create your models here.


class Coordinate (models.Model):
    lat = models.FloatField()
    lng = models.FloatField()

    def as_dict(self):
        return {
            "lat": self.lat,
            "lng": self.lng,
        }

    def __str__(self):
        return f"{self.lat, self.lng}"

class Area (models.Model):
    name = models.CharField(max_length=64)
    co = models.ManyToManyField(Coordinate, blank=True, related_name="coordinate")
    is_activated = models.BooleanField(default=False)

    def as_dict(self):
        coordinates = self.co.all()
        list_c = []
        for c in coordinates :
            list_c.append(c.as_dict())
        return {
            "id": self.id,
            "name": self.name,
            "is_activated": self.is_activated,
            "co": list_c
        }

    def __str__(self):
        return f"{self.name, self.is_activated}"
