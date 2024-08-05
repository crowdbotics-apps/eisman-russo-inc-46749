from rest_framework import serializers

from ticketing.models import SubActivity, TruckType


class SubActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubActivity
        fields = "__all__"


class TruckTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckType
        fields = "__all__"
