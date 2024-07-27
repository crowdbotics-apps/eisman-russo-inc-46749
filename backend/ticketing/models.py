from django.db import models

from base.models import BaseFieldModel


# Create your models here.

class DebrisType(BaseFieldModel):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
