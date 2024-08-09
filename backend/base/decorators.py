from functools import wraps
from rest_framework import status
from rest_framework.response import Response

from base.permissions import ALL_PERMISSIONS


def check_permissions(permissions, custom_methods=[]):

    def decorator(target):
        if isinstance(target, type):
            # The target is a class, apply the decorator to its methods
            methods = [
                "list",
                "create",
                "retrieve",
                "update",
                "destroy",
            ] + custom_methods
            for method in methods:
                if hasattr(target, method):
                    original_method = getattr(target, method)
                    decorated_method = apply_permission_check(permissions)(
                        original_method
                    )
                    setattr(target, method, decorated_method)
            return target
        else:
            # The target is a function/method, apply the decorator directly
            return apply_permission_check(permissions)(target)

    return decorator


def apply_permission_check(permissions):
    def decorator(func):
        @wraps(func)
        def wrapped(self, request, *args, **kwargs):
            for permission in permissions:
                if not request.user.has_perm(
                    f"{ALL_PERMISSIONS[permission]['app_name']}.{permission}"
                ):
                    return Response(
                        {"detail": "You do not have the required permissions."},
                        status=status.HTTP_403_FORBIDDEN,
                    )
            return func(self, request, *args, **kwargs)

        return wrapped

    return decorator
