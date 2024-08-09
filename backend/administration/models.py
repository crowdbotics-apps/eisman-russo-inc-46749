from django.db import models

from base.models import BaseFieldModel
from base.permissions import (
    MANAGE_DEBRIS_TYPE,
    ALL_PERMISSIONS,
    MANAGE_HAZARD_TYPE,
    MANAGE_HAZARD_NAME,
    MANAGE_TRUCK_TYPE,
    MANAGE_SUBACTIVITY,
)


# Create your models here.


# Create your models here.
# "rate_matrix_fields": {
#         "mileage": false,
#         "diameter": false,
#         "unit": false,
#         "weight": false,
#         "reduction_rate": false
# }


class DebrisType(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    rate_matrix_fields = models.JSONField(null=True, blank=True)

    class Meta:
        permissions = [
            (MANAGE_DEBRIS_TYPE, ALL_PERMISSIONS[MANAGE_DEBRIS_TYPE]["name"]),
        ]

    def __str__(self):
        return self.name


class HazardType(BaseFieldModel):
    type = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        permissions = [
            (MANAGE_HAZARD_TYPE, ALL_PERMISSIONS[MANAGE_HAZARD_TYPE]["name"]),
        ]

    def __str__(self):
        return self.type


class HazardName(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    type = models.ForeignKey(HazardType, on_delete=models.CASCADE, related_name="name")

    class Meta:
        permissions = [
            (MANAGE_HAZARD_NAME, ALL_PERMISSIONS[MANAGE_HAZARD_NAME]["name"]),
        ]

    def __str__(self):
        return self.name


class TruckType(BaseFieldModel):
    type = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        permissions = [
            (MANAGE_TRUCK_TYPE, ALL_PERMISSIONS[MANAGE_TRUCK_TYPE]["name"]),
        ]

    def __str__(self):
        return self.type


class SubActivity(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        permissions = [
            (MANAGE_SUBACTIVITY, ALL_PERMISSIONS[MANAGE_SUBACTIVITY]["name"]),
        ]

    def __str__(self):
        return self.name
