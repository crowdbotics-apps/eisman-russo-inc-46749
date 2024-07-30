from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from base.models import BaseFieldModel


# Create your models here.

class DebrisType(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Event(BaseFieldModel):
    name = models.CharField(max_length=500, unique=True)
    event_date = models.DateField()
    declaration_date = models.DateField()
    is_active = models.BooleanField(default=True)
    notes = models.TextField(null=True, blank=True)


class FemaDates(BaseFieldModel):
    start_date = models.DateField()
    end_date = models.DateField()
    percentage = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(100)
        ]
    )
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="fema_dates")

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['event', 'start_date', 'end_date'], name='unique_event_start_date_end_date')
        ]



class HazardType(BaseFieldModel):
    type = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return self.type
    

class HazardName(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    type = models.ForeignKey(HazardType, on_delete=models.CASCADE,related_name="name")

    def __str__(self):
        return self.name
