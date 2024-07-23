from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class LoginViewSet(ViewSet, TokenObtainPairView):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = TokenObtainPairSerializer

    def create(self, request, *args, **kwargs):
        # Use the serializer to validate and get the token
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        access = serializer.validated_data['access']

        response_data = {
            'access': str(access)
        }

        return Response(response_data, status=status.HTTP_200_OK)


class TestViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # Use the serializer to validate and get the token
        print('1')
        return Response({}, status=status.HTTP_200_OK)
