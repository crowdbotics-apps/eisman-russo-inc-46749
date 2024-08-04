# Generated by Django 3.2.23 on 2024-08-04 07:14

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("ticketing", "0006_project"),
    ]

    operations = [
        migrations.CreateModel(
            name="ContractorRateMatrix",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True, null=True)),
                ("modified_at", models.DateTimeField(auto_now=True, null=True)),
                ("mileage_from", models.FloatField(blank=True, default=0, null=True)),
                ("mileage_to", models.FloatField(blank=True, default=0, null=True)),
                ("diameter_from", models.FloatField(blank=True, default=0, null=True)),
                ("diameter_to", models.FloatField(blank=True, default=0, null=True)),
                ("unit_from", models.FloatField(blank=True, default=0, null=True)),
                ("unit_to", models.FloatField(blank=True, default=0, null=True)),
                ("weight_from", models.FloatField(blank=True, default=0, null=True)),
                ("weight_to", models.FloatField(blank=True, default=0, null=True)),
                ("rate", models.FloatField()),
                (
                    "unit_type",
                    models.CharField(
                        choices=[("each", "Each"), ("tons", "Tons"), ("cyds", "CYDS")],
                        max_length=50,
                    ),
                ),
                (
                    "reduction_rate",
                    models.FloatField(
                        blank=True,
                        null=True,
                        validators=[
                            django.core.validators.MaxValueValidator(100),
                            django.core.validators.MinValueValidator(0),
                        ],
                    ),
                ),
                (
                    "debris_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="debris_rate_matrix",
                        to="ticketing.debristype",
                    ),
                ),
                (
                    "project",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="project_rate_matrix",
                        to="ticketing.project",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
