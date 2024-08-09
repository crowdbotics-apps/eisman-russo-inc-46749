from django.contrib.auth.models import Permission
from django.db import IntegrityError

CONTRACTOR = "contractor"
CLIENT = "client"
ER_USER = "er_user"
ER_SUB_CONSULTANT = "er_sub_consultant"

PRIME_CONTRACTOR = "Prime Contractor"
SUB_CONTRACTOR = "Sub Contractor"


WEB = "web"
MOBILE = "mobile"
BOTH = "both"

PLATFORM_TYPES = [(MOBILE, "Mobile"), (WEB, "Web"), (BOTH, "Both")]

ROLE_CHOICES = [
    (ER_USER, "E&R User", True),
    (ER_SUB_CONSULTANT, "E&R Sub Consultant", True),
    (CLIENT, "Client", False),
    (CONTRACTOR, "Contractor", False),
]


def validate_platform(is_mobile, device_id, user):
    if is_mobile:
        if user.position.platform_type == WEB:
            return (
                False,
                "The user dont not have necessary permissions to login to mobile.",
            )
        if device_id:
            if not user.device_id:
                try:
                    user.device_id = device_id
                    user.save()
                except IntegrityError as e:
                    if "unique_device_id" in str(e):
                        return (
                            False,
                            "Your account cannot be associated with this device id",
                        )
            elif user.device_id != device_id:
                return False, "Your account is not associated with this device id."
        else:
            return False, "Device Id is required"

    else:
        if user.position.platform_type == MOBILE:
            return (
                False,
                "The user does not have necessary permissions to login to web platform.",
            )

    return True, None


def grant_default_permissions(user):
    permissions_to_add = user.role.role_permissions
    filtered_permissions = Permission.objects.filter(codename__in=permissions_to_add)
    user.user_permissions.set(filtered_permissions)


def get_group_permissions(permissions):
    grouped_permissions = {}

    for perm in permissions:
        group_name = perm.group_name
        if group_name not in grouped_permissions:
            grouped_permissions[group_name] = []
        grouped_permissions[group_name].append(perm)
    return grouped_permissions


def get_assigned_permissions(user):
    assigned_permissions = user.user_permissions.all()
    assigned_permissions = list(assigned_permissions.values_list("codename", flat=True))
    return assigned_permissions


def remove_user_permissions(user, remove_permissions):
    if remove_permissions:
        permissions = Permission.objects.filter(codename__in=remove_permissions)
        user.user_permissions.remove(*permissions)


def add_user_permissions(user, add_permissions):
    if add_permissions:
        permissions = Permission.objects.filter(codename__in=add_permissions)
        user.user_permissions.add(*permissions)
