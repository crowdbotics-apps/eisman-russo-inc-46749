from django.db import models
from base.models import BaseFieldModel

# Create your models here.


class DebrisType(BaseFieldModel):
    debris_name = models.CharField(max_length=255, unique=True)
    status = models.BooleanField(default=True)  
    cerated_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.debris_name 