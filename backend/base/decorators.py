from functools import wraps
from rest_framework import status
from rest_framework.response import Response


def check_permissions(permissions):
    def decorator(func):
        @wraps(func)
        def wrapped(self, request, *args, **kwargs):
            for permission in permissions:
                if not request.user.has_perm(permission):
                    return Response(
                        {"detail": "You do not have the required permissions."},
                        status=status.HTTP_403_FORBIDDEN,
                    )
            return func(self, request, *args, **kwargs)

        return wrapped

    return decorator

def class_check_permissions(permissions):
    def class_decorator(cls):
        for method in ['list', 'create', 'retrieve', 'update', 'destroy']:
            if hasattr(cls, method):
                original_method = getattr(cls, method)
                decorated_method = check_permissions(permissions)(original_method)
                setattr(cls, method, decorated_method)
        return cls
    return class_decorator