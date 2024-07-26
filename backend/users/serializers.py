from django.contrib.auth import get_user_model
from rest_framework import serializers

from users.models import Role, Position

User = get_user_model()


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class PositionCreateSerializer(serializers.ModelSerializer):
    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        required=True
    )

    class Meta:
        model = Position
        fields = '__all__'


class PositionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'

    def validate(self, data):
        """
        Check that the password and confirm_password fields match.
        """
        if data.get('role'):
            if self.instance.role != data['role']:
                total_user_position = self.instance.user_position.count()
                if total_user_position > 0:
                    raise serializers.ValidationError("Role cannot be changes as users are associated with it")
        return data


class PositionSerializer(serializers.ModelSerializer):
    role = RoleSerializer()

    class Meta:
        model = Position
        fields = '__all__'


class UserReadSerializer(serializers.ModelSerializer):
    role = RoleSerializer()
    position = PositionSerializer()

    class Meta:
        model = User
        fields = ["id", "name", "email", "role", "position", "phone_number", "address", "latitude", "longitude"]


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        required=True
    )
    position = serializers.PrimaryKeyRelatedField(
        queryset=Position.objects.all(),
        required=True
    )

    class Meta:
        model = User
        fields = ['email', 'password', 'confirm_password', 'role', 'position', 'is_active', 'phone_number', 'name',
                  'address', 'latitude', 'longitude']

    def validate(self, data):
        """
        Check that the password and confirm_password fields match.
        """
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role'],
            position=validated_data['position'],
            is_active=validated_data.get('is_active', True),
            phone_number=validated_data.get('phone_number', ""),
            name=validated_data.get('name', ""),
            address=validated_data.get('address', ""),
            latitude=validated_data.get('latitude', None),
            longitude=validated_data.get('longitude', None),
        )
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'phone_number', 'address', 'latitude', 'longitude', 'role', 'position', 'is_active']

    def validate(self, data):
        role = data.get('role')
        position = data.get('position')
        # password = data.get('password')
        # confirm_password = data.get('confirm_password')

        if role and position:
            if role != position.role:
                raise serializers.ValidationError("Role and Position should be same")
        elif position:
            if self.instance.role != position.role:
                raise serializers.ValidationError("Role and Position should be same")
        elif role:
            if role != self.instance.position.role:
                raise serializers.ValidationError("Role and Position should be same")

        # Check that the password and confirm_password fields match.
        # if password and confirm_password:
        #     if password != confirm_password:
        #         raise serializers.ValidationError("Passwords do not match")
        # elif password and not confirm_password:
        #     raise serializers.ValidationError("Confirm Password is required")
        # elif confirm_password and not password:
        #     raise serializers.ValidationError("Password is required")
        return data
