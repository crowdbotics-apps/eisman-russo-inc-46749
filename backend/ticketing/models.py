from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from base.models import BaseFieldModel


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
            ("can_manage_debris_type", "Can manage debris type"),
        ]
    def __str__(self):
        return self.name


class Event(BaseFieldModel):
    name = models.CharField(max_length=500, unique=True)
    event_date = models.DateField()
    declaration_date = models.DateField()
    is_active = models.BooleanField(default=True)
    notes = models.TextField(null=True, blank=True)



class Project(BaseFieldModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="projects")


class FemaDates(BaseFieldModel):
    start_date = models.DateField()
    end_date = models.DateField()
    percentage = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)]
    )
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name="fema_dates"
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["event", "start_date", "end_date"],
                name="unique_event_start_date_end_date",
            )
        ]
    


class HazardType(BaseFieldModel):
    type = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    class Meta:
        permissions = [
            ("can_manage_hazard_type", "Can manage hazard type"),
        ]

    def __str__(self):
        return self.type


class HazardName(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    type = models.ForeignKey(HazardType, on_delete=models.CASCADE, related_name="name")
    
    class Meta:
        permissions = [
            ("can_manage_hazard_name", "Can manage hazard name"),
        ]

    def __str__(self):
        return self.name


class TruckType(BaseFieldModel):
    type = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        permissions = [
            ("can_manage_truck_description", "Can manage truck description"),
        ]

    def __str__(self):
        return self.type


class SubActivity(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        permissions = [
            ("can_manage_sub_activity", "Can manage sub activity"),
        ]

    def __str__(self):
        return self.name
