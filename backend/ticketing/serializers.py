from rest_framework import serializers
from .models import DebrisType


class DebrisSerializer(serializers.ModelSerializer):
    class Meta:
        model = DebrisType
        fields = '__all__'
