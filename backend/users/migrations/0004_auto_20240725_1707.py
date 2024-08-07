# Generated by Django 3.2.23 on 2024-07-25 17:07

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0003_auto_20240723_1837"),
    ]

    operations = [
        migrations.CreateModel(
            name="Role",
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
                (
                    "name",
                    models.CharField(
                        max_length=255, unique=True, verbose_name="Role Name"
                    ),
                ),
                (
                    "type",
                    models.CharField(
                        max_length=255, unique=True, verbose_name="Role Type"
                    ),
                ),
                ("can_add_positions", models.BooleanField(default=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="user",
            name="address",
            field=models.CharField(
                blank=True, max_length=255, null=True, verbose_name="Address"
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="latitude",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="longitude",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="modified_at",
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="phone_number",
            field=models.CharField(blank=True, max_length=17, null=True),
        ),
        migrations.CreateModel(
            name="Position",
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
                (
                    "name",
                    models.CharField(max_length=255, verbose_name="Position Name"),
                ),
                (
                    "platform_type",
                    models.CharField(
                        choices=[
                            ("mobile", "Mobile"),
                            ("web", "Web"),
                            ("both", "Both"),
                        ],
                        default="web",
                        max_length=50,
                    ),
                ),
                ("is_project_specific_position", models.BooleanField(default=False)),
                (
                    "role",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="users.role",
                    ),
                ),
            ],
            options={
                "unique_together": {("role_id", "name")},
            },
        ),
        migrations.AddField(
            model_name="user",
            name="position",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="user_position",
                to="users.position",
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="role",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="user_role",
                to="users.role",
            ),
        ),
    ]
