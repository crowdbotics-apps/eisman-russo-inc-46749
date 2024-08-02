CONTRACTOR = "contractor"
CLIENT = "client"
ER_USER = "er_user"
ER_SUB_CONSULTANT = "er_sub_consultant"

PRIME_CONTRACTOR = "Prime Contractor"
SUB_CONTRACTOR = "Sub Contractor"

WEB = "web"
MOBILE = "mobile"
BOTH = "both"

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
                user.device_id = device_id
                user.save()
            elif user.device_id != device_id:
                return False, "Device Id Don't Match"
        else:
            return False, "Device Id is required"

    else:
        if user.position.platform_type == MOBILE:
            return (
                False,
                "The user does not have necessary permissions to login to web platform.",
            )

    return True, None
