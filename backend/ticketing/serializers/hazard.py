from rest_framework import serializers

from ticketing.models import HazardName, HazardType, DebrisType


class HazardTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HazardType
        fields = "__all__"


class HazardNameSerializer(serializers.ModelSerializer):
    type = HazardTypeSerializer()

    class Meta:
        model = HazardName
        fields = "__all__"


class DebrisSerializer(serializers.ModelSerializer):
    class Meta:
        model = DebrisType
        fields = "__all__"
