# Generated by Django 3.2.23 on 2024-08-09 07:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("ticketing", "0012_auto_20240809_0729"),
    ]

    operations = [
        migrations.DeleteModel(
            name="DebrisType",
        ),
        migrations.RemoveField(
            model_name="hazardname",
            name="type",
        ),
        migrations.DeleteModel(
            name="SubActivity",
        ),
        migrations.DeleteModel(
            name="TruckType",
        ),
        migrations.DeleteModel(
            name="HazardName",
        ),
        migrations.DeleteModel(
            name="HazardType",
        ),
    ]
