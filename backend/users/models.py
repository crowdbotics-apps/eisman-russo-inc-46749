from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from base.models import BaseFieldModel
from users.managers import CustomUserManager
from users.utils import MOBILE, WEB, BOTH

class Role(BaseFieldModel):
    name = models.CharField(_("Role Name"), max_length=255, unique=True)
    type = models.CharField(_("Role Type"), max_length=255, unique=True)
    can_add_positions = models.BooleanField(default=True)
    role_permissions = ArrayField(models.CharField(max_length=255), blank=True, null=True)
    
    class Meta:
        permissions = [
            ("can_manage_role", "Can manage role"),
        ]
    


class Position(BaseFieldModel):
    PLATFORM_TYPES = [

        (MOBILE, "Mobile"),
        (WEB, "Web"),
        (BOTH, "Both"),
    ]

    name = models.CharField(
        _("Position Name"),
        max_length=255,
    )
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    platform_type = models.CharField(max_length=50, choices=PLATFORM_TYPES, default=WEB)
    is_project_specific_position = models.BooleanField(default=False)

    class Meta:
        unique_together = ("role_id", "name")
    class Meta:
        permissions = [
            ("can_manage_position", "Can manage position"),
        ]


class UserAttachments(BaseFieldModel):
    key = models.TextField()
    type = models.CharField(max_length=255)
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="attachments"
    )


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
        null=True,
        blank=True,
    )
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    email = models.EmailField(_("email address"), unique=True)
    role = models.ForeignKey(
        Role, on_delete=models.SET_NULL, blank=True, null=True, related_name="user_role"
    )
    position = models.ForeignKey(
        Position,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="user_position",
    )
    phone_number = models.CharField(max_length=17, blank=True, null=True)
    address = models.CharField(_("Address"), blank=True, null=True, max_length=255)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    device_id = models.CharField(max_length=255, null=True, blank=True)
    prime_contractor = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="user_prime_contractor",
    )

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    modified_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

        
    objects = CustomUserManager()

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def create_attachments(self, attachments_data):
        if attachments_data:
            attachments = [
                UserAttachments(user=self, **attachment_data)
                for attachment_data in attachments_data
            ]
            UserAttachments.objects.bulk_create(attachments)

    def delete_attachments(self, attachments_data):
        if attachments_data:
            UserAttachments.objects.filter(
                user=self,
                id__in=[attachment_data for attachment_data in attachments_data],
            ).delete()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["device_id"], name="unique_device_id"),
        ]


class UserAdditionalData(BaseFieldModel):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="additional_data"
    )
    company_name = models.CharField(max_length=255, blank=True, null=True)
    prefix = models.CharField(max_length=255, blank=True, null=True)
    notes = models.TextField(null=True, blank=True)
    email_ticket_receipt = ArrayField(models.EmailField(), blank=True, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["company_name"], name="unique_company_name"
            ),
            models.UniqueConstraint(fields=["prefix"], name="unique_prefix"),
        ]
