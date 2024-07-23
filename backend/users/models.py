from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from base.models import TimeStampedModel
from users.managers import CustomUserManager


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
        _('username'),
        max_length=150,
        unique=True,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
        null=True,
        blank=True
    )
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class Role(TimeStampedModel):
    name = models.CharField(
        _("Role Name"), max_length=255, unique=True
    )
    type = models.CharField(
        _("Role Type"), max_length=255, unique=True
    )


class Position(TimeStampedModel):
    PLATFORM_TYPES = [
        ('mobile', 'Mobile'),
        ('web', 'Web'),
        ('both', 'Both'),
    ]

    name = models.CharField(
        _("Position Name"), max_length=255,
    )
    role_id = models.ForeignKey(Role, on_delete=models.CASCADE)
    platform_type = models.CharField(max_length=50, choices=PLATFORM_TYPES, default='web')

    class Meta:
        unique_together = ('role_id', 'name')