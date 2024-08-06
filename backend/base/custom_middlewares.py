from django.http import HttpResponseForbidden, HttpResponse, JsonResponse
from django.utils.deprecation import MiddlewareMixin
from requests import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework import status

from users.utils import WEB, MOBILE


class DeviceMiddlewareMiddleware(MiddlewareMixin):

    def __init__(self, get_response):
        self.get_response = get_response
        self.jwt_authenticator = JWTAuthentication()

    def __call__(self, request):
        # Process the request and add the user if not already set
        response = self.process_request(request)
        if response:
            return response

        # Call the next middleware or view
        response = self.get_response(request)

        # Optionally process the response here if needed
        return response

    def process_request(self, request):
        # Handle mobile detection
        is_mobile = request.headers.get("isMobile")
        request.is_mobile = is_mobile == "true"
        device_id = request.headers.get("deviceId", None)
        request.device_id = device_id

        # Handle JWT Authentication
        if request.is_mobile and request.user.is_anonymous:
            auth_header = request.headers.get("Authorization")
            if auth_header and auth_header.startswith("Bearer "):
                token = auth_header.split()[1]
                try:
                    validated_token = self.jwt_authenticator.get_validated_token(token)
                    request.user = self.jwt_authenticator.get_user(validated_token)
                except (InvalidToken, TokenError):
                    return JsonResponse(
                        {"detail": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED
                    )

                user = request.user
                if request.is_mobile:
                    if user.position.platform_type == WEB:
                        return JsonResponse(
                            {
                                "detail": "The user dont have necessary permissions to use "
                                "mobile platform."
                            },
                            status=status.HTTP_400_BAD_REQUEST,
                        )
                    if request.device_id:
                        if user.device_id != request.device_id:
                            return JsonResponse(
                                {
                                    "detail": "Your account is not associated with this device id."
                                },
                                status=status.HTTP_401_UNAUTHORIZED,
                            )
                    else:
                        return JsonResponse(
                            {"detail": "Device Id is required"},
                            status=status.HTTP_400_BAD_REQUEST,
                        )

                else:
                    if user.position.platform_type == MOBILE:
                        return JsonResponse(
                            {
                                "detail": "The user does not have necessary permissions to login "
                                "to web platform."
                            },
                            status=status.HTTP_400_BAD_REQUEST,
                        )
