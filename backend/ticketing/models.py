from base.models import BaseFieldModel

from django.conf import settings
from django.core.validators import (
    MaxValueValidator,
    MinValueValidator,
    validate_image_file_extension,
)
from django.db import models


class DebrisType(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    rate_matrix_fields = models.JSONField(null=True, blank=True)

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

    def __str__(self):
        return self.type


class HazardName(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    type = models.ForeignKey(HazardType, on_delete=models.CASCADE, related_name="name")

    def __str__(self):
        return self.name


class TruckType(BaseFieldModel):
    type = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.type


class SubActivity(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class State(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class City(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name="cities")

    def __str__(self):
        return self.name


class Project(BaseFieldModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="projects")
    name = models.CharField(max_length=500)
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    contractor = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING
    )
    po_number = models.CharField(max_length=255, null=True, blank=True)
    project_identfication_number = models.CharField(
        max_length=255, null=True, blank=True
    )
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="projects")
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name="projects")
    sub_activity = models.ForeignKey(
        SubActivity, on_delete=models.CASCADE, related_name="projects"
    )


class Attachments(BaseFieldModel):
    image = models.ImageField(
        upload_to="attachments", validators=[validate_image_file_extension]
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="attachments"
    )
