from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from rest_framework import serializers

from base.utils import generate_pre_signed_url
from users.models import Role, Position, UserAdditionalData, UserAttachments
from users.utils import CONTRACTOR, SUB_CONTRACTOR, PRIME_CONTRACTOR

User = get_user_model()


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class PositionCreateSerializer(serializers.ModelSerializer):
    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), required=True
    )

    class Meta:
        model = Position
        fields = "__all__"


class PositionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = "__all__"

    def validate(self, data):
        """
        Check that the password and confirm_password fields match.
        """
        if data.get("role"):
            if self.instance.role != data["role"]:
                total_user_position = self.instance.user_position.count()
                if total_user_position > 0:
                    raise serializers.ValidationError(
                        {
                            "role": [
                                "Role cannot be changed as users are associated with it"
                            ]
                        }
                    )
        return data


class PositionSerializer(serializers.ModelSerializer):
    role = RoleSerializer()

    class Meta:
        model = Position
        fields = "__all__"


class PrimeContractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name"]


class UserAdditionalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdditionalData
        fields = "__all__"


class UserAdditionalDataModifySerializer(serializers.ModelSerializer):
    email_ticket_receipt = serializers.ListField(
        child=serializers.EmailField(
            error_messages={
                "invalid": "Please enter a valid email address for email ticket receipt."
            }
        ),
        required=False,
    )

    class Meta:
        model = UserAdditionalData
        fields = ["company_name", "prefix", "notes", "email_ticket_receipt"]


class UserReadSerializer(serializers.ModelSerializer):
    role = RoleSerializer()
    position = PositionSerializer()
    prime_contractor = PrimeContractorSerializer()
    additional_data = UserAdditionalDataSerializer()

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "email",
            "role",
            "device_id",
            "position",
            "phone_number",
            "address",
            "latitude",
            "longitude",
            "is_active",
            "prime_contractor",
            "additional_data",
        ]


class UserProfileSerializer(serializers.ModelSerializer):
    role = RoleSerializer()
    position = PositionSerializer()

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "email",
            "role",
            "position",
            "phone_number",
            "address",
            "latitude",
            "longitude",
            "device_id",
            "is_active",
        ]


class UserAttachmentsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAttachments
        fields = [
            "key",
            "type",
        ]


class UserAttachmentsReadSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = UserAttachments
        fields = "__all__"

    def get_url(self, obj):
        if obj.key:
            return generate_pre_signed_url(obj.key)


class UserCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), required=True
    )
    position = serializers.PrimaryKeyRelatedField(
        queryset=Position.objects.all(), required=True
    )
    prime_contractor = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(
            role__type=CONTRACTOR, position__name=PRIME_CONTRACTOR
        ),
        required=False,
    )
    additional_data = UserAdditionalDataModifySerializer(required=False)
    attachments = UserAttachmentsCreateSerializer(many=True, required=False)

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "confirm_password",
            "role",
            "position",
            "is_active",
            "phone_number",
            "name",
            "address",
            "latitude",
            "longitude",
            "prime_contractor",
            "additional_data",
            "attachments",
        ]

    def validate(self, data):
        """
        Check that the password and confirm_password fields match.
        """
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({"password": ["Passwords do not match"]})

        if data["role"] and data["role"].type == CONTRACTOR:
            prime_contractor = data.get("prime_contractor", None)
            additional_data = data.get("additional_data", None)

            company_name = (
                additional_data.get("company_name", None) if additional_data else None
            )
            prefix = additional_data.get("prefix", None) if additional_data else None
            if not company_name:
                raise serializers.ValidationError(
                    {"company_name": ["Company Name is required"]}
                )
            if not prefix:
                raise serializers.ValidationError({"prefix": ["Prefix is required"]})

            if data["position"] and data["position"].name == SUB_CONTRACTOR:
                if not prime_contractor:
                    raise serializers.ValidationError(
                        {"prime_contractor": ["Prime Contractor is required"]}
                    )

        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            role=validated_data["role"],
            position=validated_data["position"],
            is_active=validated_data.get("is_active", True),
            phone_number=validated_data.get("phone_number", ""),
            name=validated_data.get("name", ""),
            address=validated_data.get("address", ""),
            latitude=validated_data.get("latitude", None),
            longitude=validated_data.get("longitude", None),
            prime_contractor=validated_data.get("prime_contractor", None),
        )
        additional_data = validated_data.get("additional_data", None)

        company_name = (
            additional_data.get("company_name", None) if additional_data else None
        )
        prefix = additional_data.get("prefix", None) if additional_data else None
        if user.role.type == CONTRACTOR and company_name and prefix:
            try:
                UserAdditionalData.objects.create(
                    user=user,
                    company_name=company_name,
                    prefix=prefix,
                    notes=additional_data.get("notes", None),
                    email_ticket_receipt=additional_data.get(
                        "email_ticket_receipt", []
                    ),
                )
            except IntegrityError as e:
                if "unique_company_name" in str(e):
                    raise serializers.ValidationError(
                        {"company_name": ["Company Name already exists"]}
                    )

                if "unique_prefix" in str(e):
                    raise serializers.ValidationError(
                        {"prefix": ["Prefix already exists"]}
                    )

        attachments = validated_data.get("attachments", None)
        if attachments:
            user.create_attachments(attachments)
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(allow_null=False)
    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), allow_null=False
    )
    position = serializers.PrimaryKeyRelatedField(
        queryset=Position.objects.all(), allow_null=False
    )
    additional_data = UserAdditionalDataModifySerializer(required=False)
    prime_contractor = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(
            role__type=CONTRACTOR, position__name=PRIME_CONTRACTOR
        ),
        required=False,
    )
    attachments = UserAttachmentsCreateSerializer(many=True, required=False)
    remove_attachments = serializers.ListField(
        child=serializers.UUIDField(),
        required=False,
    )

    class Meta:
        model = User
        fields = [
            "name",
            "phone_number",
            "address",
            "device_id",
            "latitude",
            "longitude",
            "role",
            "position",
            "is_active",
            "prime_contractor",
            "additional_data",
            "attachments",
            "remove_attachments",
        ]

    def validate(self, data):
        role = data.get("role", self.instance.role)
        position = data.get("position", self.instance.position)

        if role and position:
            if role != position.role:
                raise serializers.ValidationError(
                    {"role": ["Role and Position role should be same"]}
                )
        elif position:
            if self.instance.role != position.role:
                raise serializers.ValidationError(
                    {"role": ["Role and Position role should be same"]}
                )
        elif role:
            if role != self.instance.position.role:
                raise serializers.ValidationError(
                    {"role": ["Role and Position role should be same"]}
                )

        if role and role.type == CONTRACTOR:
            prime_contractor = data.get(
                "prime_contractor", self.instance.prime_contractor
            )
            if position.name == SUB_CONTRACTOR:
                if not prime_contractor:
                    raise serializers.ValidationError(
                        {"prime_contractor": ["Prime Contractor is required"]}
                    )
            additional_data = data.get("additional_data", None)
            if additional_data:
                company_name = (
                    additional_data.get("company_name", None)
                    if additional_data
                    else None
                )
                prefix = (
                    additional_data.get("prefix", None) if additional_data else None
                )
                if not company_name:
                    raise serializers.ValidationError(
                        {"company_name": ["Company Name is required"]}
                    )
                if not prefix:
                    raise serializers.ValidationError(
                        {"prefix": ["Prefix is required"]}
                    )

        return data

    def update(self, instance, validated_data):
        additional_data = validated_data.pop("additional_data", None)
        attachments = validated_data.pop("attachments", None)
        remove_attachments = validated_data.pop("remove_attachments", None)
        user = super().update(instance, validated_data)

        if additional_data:
            user_additional_data = (
                user.additional_data if hasattr(user, "additional_data") else None
            )
            try:

                if user_additional_data:
                    for attr, value in additional_data.items():
                        setattr(user_additional_data, attr, value)
                    user_additional_data.save()
                else:
                    UserAdditionalData.objects.create(user=user, **additional_data)

            except IntegrityError as e:
                if "unique_company_name" in str(e):
                    raise serializers.ValidationError(
                        {"company_name": ["Company Name already exists"]}
                    )

                if "unique_prefix" in str(e):
                    raise serializers.ValidationError(
                        {"prefix": ["Prefix already exists"]}
                    )
        if attachments:
            user.create_attachments(attachments)
        if remove_attachments:
            user.delete_attachments(remove_attachments)

        return user


class ResetPasswordSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_new_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        new_password = data.get("new_password")
        confirm_new_password = data.get("confirm_new_password")

        # Check if new password and confirm new password match
        if new_password != confirm_new_password:
            raise serializers.ValidationError({"password": ["Passwords do not match."]})

        return data


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_new_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        user = self.context.get("user")
        new_password = data.get("new_password")
        confirm_new_password = data.get("confirm_new_password")
        old_password = data.get("old_password")

        if old_password and not user.check_password(old_password):
            raise serializers.ValidationError(
                {"old_password": ["Old password is not correct."]}
            )

        # Check if new password and confirm new password match
        if new_password != confirm_new_password:
            raise serializers.ValidationError({"password": ["Passwords do not match."]})

        return data
