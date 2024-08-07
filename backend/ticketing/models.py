from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models import Q
from rest_framework.exceptions import ValidationError

from base.models import BaseFieldModel
from ticketing.utils import EACH, TONS, CYDS


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
        DebrisType, on_delete=models.CASCADE, related_name="debris_rate_matrix"
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
