from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.pagination import ListPagination
from base.utils import error_handler
from users.models import Role, Position
from users.serializers import (RoleSerializer, UserCreateSerializer, UserReadSerializer, PositionSerializer,
                               PositionCreateSerializer, PositionUpdateSerializer, UserUpdateSerializer)

User = get_user_model()


class LoginViewSet(ViewSet, TokenObtainPairView):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = TokenObtainPairSerializer

    def create(self, request, *args, **kwargs):
        # Use the serializer to validate and get the token
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        access = serializer.validated_data['access']
        user = serializer.user
        if not user.position or not user.role:
            return Response({'detail': "The user does not have an assigned role."}, status=status.HTTP_400_BAD_REQUEST)

        response_data = {
            'access': str(access)
        }

        return Response(response_data, status=status.HTTP_200_OK)


class UserViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserReadSerializer
    queryset = User.objects.all()
    pagination_class = ListPagination
    filterset_fields = ["role", "is_active"]
    search_fields = ["name"]
    ordering = ["-created_at"]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        page = self.paginate_queryset(queryset)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response

    def create(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user_serializer = self.serializer_class(user)
            return Response({'result': user_serializer.data, 'detail': 'User Created Successfully'}, status=status.HTTP_201_CREATED)

        message = error_handler(serializer.errors)

        return Response({'detail': message}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = UserUpdateSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            user_serializer = self.serializer_class(user)
            return Response({'result': user_serializer.data, 'detail': 'User Updated Successfully'}, status=status.HTTP_200_OK)

        message = error_handler(serializer.errors)

        return Response({'detail': message}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()

        return Response({'detail': 'User Deleted Successfully'}, status=status.HTTP_200_OK)


class PositionViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PositionSerializer
    filterset_fields = ["role", "platform_type"]
    queryset = Position.objects.all()
    search_fields = ["name"]
    ordering = ["-created_at"]
    pagination_class = ListPagination

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        page = self.paginate_queryset(queryset)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response

    def create(self, request, *args, **kwargs):
        serializer = PositionCreateSerializer(data=request.data)

        if serializer.is_valid():
            # Custom validation logic
            role = request.data.get('role')
            name = request.data.get('name')

            # Check if a Position with the same role and name already exists
            if Position.objects.filter(role=role, name=name).exists():
                return Response(
                    {"detail": "Position with this name already exists."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            position = serializer.save()

            position_serializer = PositionSerializer(position)

            return Response({'result': position_serializer.data, 'detail': 'Position Created Successfully'},
                            status=status.HTTP_201_CREATED)

        message = error_handler(serializer.errors)

        return Response({'detail': message}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        position = self.get_object()
        serializer = PositionUpdateSerializer(position, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                position = serializer.save()
            except IntegrityError as e:
                if 'unique constraint' in str(e).lower():
                    return Response({'detail': "Position with this name and role already exists."},
                                    status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'detail': "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

            position_serializer = PositionSerializer(position)

            return Response({'result': position_serializer.data, 'detail': 'Position Updated Successfully'},
                            status=status.HTTP_200_OK)

        message = error_handler(serializer.errors)
        return Response({'detail': message}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        position = self.get_object()
        total_user_position = position.user_position.count()
        if total_user_position > 0:
            return Response({'detail': 'Cannot delete as Users are associated with this position'},
                            status=status.HTTP_400_BAD_REQUEST)
        position.delete()

        return Response({'detail': 'Position Deleted Successfully'}, status=status.HTTP_200_OK)


class RoleViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    filterset_fields = ["can_add_positions"]
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
        roles = self.get_queryset()
        roles = self.filter_queryset(roles)
        serializer = RoleSerializer(roles, many=True)
        return Response({'results': serializer.data}, status=status.HTTP_200_OK)
