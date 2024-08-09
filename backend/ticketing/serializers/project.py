from django.contrib.auth import get_user_model
from rest_framework import serializers

from administration.models import SubActivity
from administration.serializers.serializer import (
    SubActivitySerializer,
    DebrisSerializer,
)
from ticketing.models import (
    ContractorRateMatrix,
    Event,
    Project,
)
from ticketing.utils import get_rate_matrix_custom_fields, rate_matrix_custom_fields
from users.serializers import UserReadSerializer

from .event import EventSerializer


class ProjectResponseSerialzer(serializers.ModelSerializer):
    client = UserReadSerializer()
    contractor = UserReadSerializer()
    sub_activity = SubActivitySerializer()
    event = EventSerializer()

    class Meta:
        model = Project
        fields = "__all__"
        depth = 1


class ProjectCreateUpdateSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    name = serializers.CharField(required=True)
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    client = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all())
    contractor = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.all()
    )
    sub_activity = serializers.PrimaryKeyRelatedField(
        queryset=SubActivity.objects.all()
    )
    po_number = serializers.CharField(required=False)
    project_identfication_number = serializers.CharField(required=False)

    class Meta:
        model = Project
        fields = "__all__"
        depth = 1


class ContractorRateMatrixSerializer(serializers.ModelSerializer):
    debris_type = DebrisSerializer()

    class Meta:
        model = ContractorRateMatrix
        fields = "__all__"


class ContractorRateMatrixModifySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractorRateMatrix
        fields = "__all__"

    def validate(self, data):
        rate_matrix_fields = (
            data.get("debris_type", None)
            or (self.instance.debris_type if self.instance else None)
        ).rate_matrix_fields
        for field in rate_matrix_custom_fields:
            value = (
                rate_matrix_fields.get(field, False) if rate_matrix_fields else False
            )
            if value == True:
                if not hasattr(self, "instance"):
                    require_fields = get_rate_matrix_custom_fields(field)
                    for field in require_fields:
                        if not field in data:
                            raise serializers.ValidationError(
                                {
                                    field: [
                                        "This field is required for the selected debris type."
                                    ]
                                }
                            )
                require_fields = get_rate_matrix_custom_fields(field)
                for field in require_fields:
                    if not field in data:
                        raise serializers.ValidationError(
                            {
                                field: [
                                    "This field is required for the selected debris type."
                                ]
                            }
                        )
            elif value == False:
                require_fields = get_rate_matrix_custom_fields(field)
                for field in require_fields:
                    if field in data:
                        raise serializers.ValidationError(
                            {
                                field: [
                                    "This field is not required for the selected debris type."
                                ]
                            }
                        )
        return data

    def create(self, validated_data):
        instance = ContractorRateMatrix(**validated_data)
        instance.clean()
        instance.save()
        return instance

    def update(self, instance, validated_data):
        # Update the instance with validated data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Validate instance using model's clean method
        instance.clean()

        # Save the instance and return it
        instance.save()
        return instance
