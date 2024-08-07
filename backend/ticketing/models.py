from base.models import BaseFieldModel
from django.conf import settings
from django.core.validators import (
    MaxValueValidator,
    MinValueValidator,
    validate_image_file_extension,
)
from django.db import models
from django.db.models import Q
from rest_framework.exceptions import ValidationError

from base.models import BaseFieldModel
from base.permissions import (
    MANAGE_DEBRIS_TYPE,
    ALL_PERMISSIONS,
    MANAGE_HAZARD_TYPE,
    MANAGE_HAZARD_NAME,
    MANAGE_SUBACTIVITY,
    MANAGE_TRUCK_TYPE,
)
from ticketing.utils import EACH, TONS, CYDS


class Event(BaseFieldModel):
    name = models.CharField(max_length=500, unique=True)
    event_date = models.DateField()
    declaration_date = models.DateField()
    is_active = models.BooleanField(default=True)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class FemaDates(BaseFieldModel):
    start_date = models.DateField()
    end_date = models.DateField()
    percentage = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)]
    )
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name="fema_dates"
    )

    def __str__(self):
        return f"{self.start_date} - {self.end_date}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["event", "start_date", "end_date"],
                name="unique_event_start_date_end_date",
            )
        ]


class Project(BaseFieldModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="projects")
    name = models.CharField(max_length=500)
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="projects"
    )
    contractor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
        related_name="contracted_projects",
    )
    po_number = models.CharField(max_length=255, null=True, blank=True)
    project_identfication_number = models.CharField(
        max_length=255, null=True, blank=True
    )
    state = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    sub_activity = models.ForeignKey(
        "administration.SubActivity", on_delete=models.CASCADE, related_name="projects"
    )
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class ContractorRateMatrix(BaseFieldModel):
    UNIT_TYPES = [
        (EACH, "Each"),
        (TONS, "Tons"),
        (CYDS, "CYDS"),
    ]

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="project_rate_matrix"
    )
    debris_type = models.ForeignKey(
        "administration.DebrisType",
        on_delete=models.CASCADE,
        related_name="debris_rate_matrix",
    )
    mileage_from = models.FloatField(null=True, blank=True, default=0)
    mileage_to = models.FloatField(null=True, blank=True, default=0)
    diameter_from = models.FloatField(null=True, blank=True, default=0)
    diameter_to = models.FloatField(null=True, blank=True, default=0)
    unit_from = models.FloatField(null=True, blank=True, default=0)
    unit_to = models.FloatField(null=True, blank=True, default=0)
    weight_from = models.FloatField(null=True, blank=True, default=0)
    weight_to = models.FloatField(null=True, blank=True, default=0)
    rate = models.FloatField()
    unit_type = models.CharField(max_length=50, choices=UNIT_TYPES)
    reduction_rate = models.FloatField(
        null=True,
        blank=True,
        validators=[MaxValueValidator(100), MinValueValidator(0)],
        default=0,
    )

    def clean(self):
        super().clean()
        # Validate mileage
        if self.mileage_from > self.mileage_to:
            raise ValidationError(
                {"mileage": ["mileage_from must be less than or equal to mileage_to."]}
            )
        # Validate diameter
        if self.diameter_from > self.diameter_to:
            raise ValidationError(
                {
                    "diameter": [
                        "diameter_from must be less than or equal to diameter_to."
                    ]
                }
            )
        # Validate unit
        if self.unit_from > self.unit_to:
            raise ValidationError(
                {"unit": ["unit_from must be less than or equal to unit_to."]}
            )
        # Validate weight
        if self.weight_from > self.weight_to:
            raise ValidationError(
                {"weight": ["weight_from must be less than or equal to weight_to."]}
            )

        if ContractorRateMatrix.objects.filter(
            debris_type=self.debris_type,
            project=self.project,
            mileage_from=self.mileage_from,
            mileage_to=self.mileage_to,
            diameter_from=self.diameter_from,
            diameter_to=self.diameter_to,
            unit_from=self.unit_from,
            unit_to=self.unit_to,
            weight_from=self.weight_from,
            weight_to=self.weight_to,
            rate=self.rate,
            unit_type=self.unit_type,
            reduction_rate=self.reduction_rate,
        ).exists():
            raise ValidationError(
                {"Rate Matrix": ["Same Matrix for this project already exists."]}
            )
        if (
            ContractorRateMatrix.objects.filter(
                debris_type=self.debris_type,
                project=self.project,
            )
            .filter(
                Q(mileage_from__lt=self.mileage_to, mileage_to__gt=self.mileage_from)
                | Q(
                    diameter_from__lt=self.diameter_to,
                    diameter_to__gt=self.diameter_from,
                )
                | Q(unit_from__lt=self.unit_to, unit_to__gt=self.unit_from)
                | Q(weight_from__lt=self.weight_to, weight_to__gt=self.weight_from)
            )
            .exists()
        ):
            raise ValidationError(
                {"Rate Matrix": ["Overlapping Matrix for this project already exists."]}
            )
