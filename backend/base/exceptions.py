# exceptions.py

from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.exceptions import InvalidToken

from base.utils import error_handler


def custom_exception_handler(exc, context):
    if hasattr(exc, 'status_code') and isinstance(exc, InvalidToken) and exc.status_code == status.HTTP_401_UNAUTHORIZED:
        return Response({'detail': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    elif hasattr(exc, 'detail') and type(exc.detail) == dict:
        message = error_handler(exc.detail)
        return Response({'detail': message}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'detail': str(exc)}, status=status.HTTP_400_BAD_REQUEST)