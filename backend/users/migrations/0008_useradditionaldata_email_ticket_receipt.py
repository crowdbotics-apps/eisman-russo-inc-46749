# Generated by Django 3.2.23 on 2024-08-01 17:04

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0007_auto_20240801_1538"),
    ]

    operations = [
        migrations.AddField(
            model_name="useradditionaldata",
            name="email_ticket_receipt",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.EmailField(max_length=254),
                blank=True,
                null=True,
                size=None,
            ),
        ),
    ]