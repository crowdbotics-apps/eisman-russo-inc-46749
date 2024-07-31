from django.db import IntegrityError
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import DebrisType, Event, FemaDates , HazardType, HazardName , TruckType ,SubActivity



class SubActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubActivity
        fields = '__all__'
        

class TruckTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckType
        fields = '__all__'
        

class HazardNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = HazardName
        fields = '__all__'
        

class HazardTypeSerializer(serializers.ModelSerializer):
    name = HazardNameSerializer(read_only=True,many=True)
    class Meta:
        model = HazardType
        fields = '__all__'
        

class DebrisSerializer(serializers.ModelSerializer):
    class Meta:
        model = DebrisType
        fields = '__all__'
        


class FemaDatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FemaDates
        fields = ['id', 'start_date', 'end_date', 'percentage']
        extra_kwargs = {
            'start_date': {'required': True},
            'end_date': {'required': True},
            'percentage': {'required': True},
        }


class EventSerializer(serializers.ModelSerializer):
    fema_dates = FemaDatesSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = '__all__'


class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

    def validate(self, data):
        event_date = data.get('event_date')
        declaration_date = data.get('declaration_date')

        if event_date and declaration_date and declaration_date > event_date:
            raise serializers.ValidationError({
                'declaration_date': ["Declaration date cannot be after event date"]
            })
        return data

    def check_required_fields(self, fema_date_data):
        required_fields = ['start_date', 'end_date', 'percentage']
        for field in required_fields:
            if not fema_date_data.get(field):
                raise serializers.ValidationError({
                    field: ["This field is required."]
                })

        if fema_date_data.get('start_date') > fema_date_data.get('end_date'):
            raise ValidationError({
                'fema_dates': ["Start date cannot be after end date."]
            })

    def create(self, validated_data):
        fema_dates_data = self.initial_data.get('fema_dates', None)
        event = Event.objects.create(**validated_data)
        if fema_dates_data:
            for fema_date_data in fema_dates_data:
                self.check_required_fields(fema_date_data)
                try:
                    FemaDates.objects.create(event=event, **fema_date_data)
                except IntegrityError as e:
                    if 'unique_event_start_date_end_date' in str(e):
                        raise serializers.ValidationError({
                            'fema_dates': ["A Fema date with the same start date and end date already exists for this "
                                           "event."]
                        })
                    else:
                        raise serializers.ValidationError({
                            'fema_dates': [
                                "An error occurred while creating the Fema date."]
                        })
        return event

    def update(self, instance, validated_data):
        fema_dates_data = self.initial_data.get('fema_dates', None)
        # Call super().update() to update the main instance fields
        instance = super().update(instance, validated_data)

        # Create or update FemaDates
        if fema_dates_data:
            existing_ids = [item['id'] for item in fema_dates_data if 'id' in item]

            # Delete FemaDates that are not in the new data
            for fema_date in instance.fema_dates.all():
                if str(fema_date.id) not in existing_ids:
                    fema_date.delete()
            fema_date_create_instances = []
            fema_date_update_instances = []
            for fema_date_data in fema_dates_data:
                self.check_required_fields(fema_date_data)
                if 'id' in fema_date_data:
                    fema_date = FemaDates.objects.get(id=fema_date_data['id'], event=instance)
                    fema_date.start_date = fema_date_data.get('start_date', fema_date.start_date)
                    fema_date.end_date = fema_date_data.get('end_date', fema_date.end_date)
                    fema_date.modified_at = timezone.now()
                    try:
                        fema_date_update_instances.append(fema_date)
                    except IntegrityError as e:
                        if 'unique_event_start_date_end_date' in str(e):
                            raise serializers.ValidationError({
                                'fema_dates': ["A Fema date with the same start date and end date already exists for "
                                               "this event."]
                            })
                        else:
                            raise serializers.ValidationError({
                                'fema_dates': ["An error occurred while updating the Fema date."]
                            })
                else:
                    try:
                        fema_date_create_instances.append(FemaDates(event=instance, **fema_date_data))
                    except IntegrityError as e:
                        if 'unique_event_start_date_end_date' in str(e):
                            raise serializers.ValidationError({
                                'fema_dates': ["A Fema date with the same start date and date already exists for this "
                                               "event."]
                            })
                        else:
                            raise serializers.ValidationError({
                                'fema_dates': ["An error occurred while creating the Fema date."]
                            })

            if fema_date_update_instances:
                FemaDates.objects.bulk_update(fema_date_update_instances,
                                              ['start_date', 'end_date', 'percentage', 'modified_at'])
            if fema_date_create_instances:
                try:
                    FemaDates.objects.bulk_create(fema_date_create_instances)
                except IntegrityError as e:
                    if 'null value in column' in str(e).lower():
                        raise serializers.ValidationError({
                            'fema_dates': ["A null value was provided where it is not allowed."]
                        })
                    elif 'unique_event_start_date_end_date' in str(e):
                        raise serializers.ValidationError({
                            'fema_dates': ["A Fema date with the same start date and date already exists for this "
                                           "event."]
                        })
                    else:
                        raise serializers.ValidationError({
                            'fema_dates': ["An error occurred while creating the Fema date."]
                        })
        elif 'fema_dates' in self.initial_data and (fema_dates_data is None or
                                                    fema_dates_data == []):
            instance.fema_dates.all().delete()

        return instance
