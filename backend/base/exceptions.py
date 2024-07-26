# exceptions.py

from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    return Response({'detail': str(exc)}, status=status.HTTP_400_BAD_REQUEST)