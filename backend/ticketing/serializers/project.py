from rest_framework import serializers
from django.contrib.auth import get_user_model
from ticketing.models import SubActivity, TruckType, Project, Event, City, State
from users.serializers import UserReadSerializer
from .event import EventSerializer


class SubActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubActivity
        fields = "__all__"


class TruckTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckType
        fields = "__all__"


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
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())
    state = serializers.PrimaryKeyRelatedField(queryset=State.objects.all())
    po_number = serializers.CharField(required=False)
    project_identfication_number = serializers.CharField(required=False)

    class Meta:
        model = Project
        fields = "__all__"
        depth = 1
