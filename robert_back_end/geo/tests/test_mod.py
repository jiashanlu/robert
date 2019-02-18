from django.test import TestCase

from geo.models import Coordinate, Area

class GeoModelTests(TestCase):

    def setUp(self):
        Coordinate.objects.create(lat=23.1567, lng=12.4546)
        Coordinate.objects.create(lat=23.1566, lng=12.4545)
        C = Coordinate.objects.get(lat=23.1567)
        C1 = Coordinate.objects.get(lat=23.1566)
        Area.objects.create(name="test")
        A = Area.objects.get(name="test")
        A.co.add(C, C1)
        A.is_activated = True
        A.save()


    def test_coordinate_model(self):
        coordinate = Coordinate.objects.get(lat=23.1567)
        self.assertTrue(isinstance(coordinate, Coordinate))
        self.assertEquals(coordinate.__str__(), f"{coordinate.lat, coordinate.lng}")

    def test_area_model(self):
        area = Area.objects.get(name="test")
        self.assertTrue(isinstance(area, Area))
        self.assertEquals(area.__str__(), f"{area.name, area.is_activated}")

    def test_area_as_dict(self):
        area = Area.objects.get(name="test")
        C = Coordinate.objects.get(lat=23.1567)
        C1 = Coordinate.objects.get(lat=23.1566)
        self.assertTrue(isinstance(area, Area))
        self.assertEquals(area.as_dict(), {
            "id": area.id,
            "name": "test",
            "is_activated": True,
            "co": [C.as_dict(), C1.as_dict()]
        })
