# Generated by Django 3.2.23 on 2024-07-31 18:03

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("ticketing", "0003_hazardname_hazardtype"),
    ]

    operations = [
        migrations.CreateModel(
            name="SubActivity",
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
                ("name", models.CharField(max_length=255, unique=True)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="TruckType",
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
                ("type", models.CharField(max_length=255, unique=True)),
                ("description", models.TextField(blank=True, null=True)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
