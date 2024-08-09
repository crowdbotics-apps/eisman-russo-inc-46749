from rest_framework import serializers

from administration.models import (
    SubActivity,
    TruckType,
    HazardName,
    HazardType,
    DebrisType,
)


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


class SubActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubActivity
        fields = "__all__"


class TruckTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckType
        fields = "__all__"
