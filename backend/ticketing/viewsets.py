from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import Permission
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import (
    DebrisType,
    Event,
    HazardName,
    HazardType,
    SubActivity,
    TruckType,
    ContractorRateMatrix,
)
from .serializers import (
    DebrisSerializer,
    EventSerializer,
    EventCreateSerializer,
    HazardNameSerializer,
    HazardTypeSerializer,
    SubActivitySerializer,
    TruckTypeSerializer,
    ContractorRateMatrixSerializer,
    ContractorRateMatrixModifySerializer,
    PermissionSerializer,
    UserPermissionSerializer,
    UserFilter,

)


from base.pagination import ListPagination
from base.utils import error_handler
from base.decorators import  class_check_permissions , check_permissions
from django.contrib.auth import get_user_model
User = get_user_model()


@class_check_permissions(['ticketing.can_manage_debris_type'])
class DebrisViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated] 
    queryset = DebrisType.objects.all()
    serializer_class = DebrisSerializer
    filterset_fields = ["is_active"]
    pagination_class = ListPagination
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
        serializer = DebrisSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"result": serializer.data}, status=status.HTTP_201_CREATED)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def retrieve(self, request, *args, **kwargs):
        debris = self.get_object()
        print(debris.id)
        serializer = self.serializer_class(debris)
        return Response({"result": serializer.data}, status=status.HTTP_200_OK)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        debris = self.get_object()
        serializer = self.serializer_class(
            instance=debris, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": serializer.data}, status=status.HTTP_200_OK)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        debris = self.get_object()
        debris.delete()
        return Response(
            {"detail": "Debris Type Deleted Successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )


class EventViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_fields = ["is_active", "event_date"]
    pagination_class = ListPagination
    search_fields = ["name"]
    ordering = ["-created_at"]


    def list(self, request, *args, **kwargs):
        events = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(events)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response


    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = EventCreateSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            event_serializer = self.serializer_class(event)
            return Response(
                {"result": event_serializer.data}, status=status.HTTP_201_CREATED
            )

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)
    

    def retrieve(self, request, *args, **kwargs):
        event = self.get_object()
        serializer = self.serializer_class(event)
        return Response({"result": serializer.data}, status=status.HTTP_200_OK)


    @transaction.atomic
    def update(self, request, *args, **kwargs):
        event = self.get_object()
        serializer = EventCreateSerializer(
            instance=event, data=request.data, partial=True
        )
        if serializer.is_valid():
            event = serializer.save()
            event_serializer = self.serializer_class(event)
            return Response(
                {"result": event_serializer.data}, status=status.HTTP_200_OK
            )

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, *args, **kwargs):
        evnet = self.get_object()
        evnet.delete()
        return Response(
            {"detail": "Event Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT
        )

@class_check_permissions(['ticketing.can_manage_hazard_type'])
class HazardTypeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = HazardType.objects.all()
    serializer_class = HazardTypeSerializer
    filterset_fields = ["is_active"]
    pagination_class = ListPagination
    search_fields = ["type"]
    ordering = ["-created_at"]

    def list(self, request, *args, **kwargs):
        hazards = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(hazards)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = HazardTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"result": serializer.data}, status=status.HTTP_201_CREATED)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def retrieve(self, request, *args, **kwargs):
        hazard = self.get_object()
        serializer = self.serializer_class(hazard)
        return Response({"result": serializer.data}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        hazard = self.get_object()
        serializer = self.serializer_class(
            instance=hazard, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": serializer.data}, status=status.HTTP_200_OK)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        hazard = self.get_object()
        hazard.delete()
        return Response(
            {"detail": "Hazard Type Deleted Successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )

@class_check_permissions(['ticketing.can_manage_hazard_name'])
class HazardNameViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = HazardName.objects.all()
    serializer_class = HazardNameSerializer
    filterset_fields = ["is_active", "type"]
    search_fields = ["name", "type"]
    pagination_class = ListPagination
    ordering = ["-created_at"]

    def list(self, request, *args, **kwargs):
        hazard = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(hazard)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = HazardNameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"result": serializer.data}, status=status.HTTP_201_CREATED)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)


    @transaction.atomic
    def retrieve(self, request, *args, **kwargs):
        hazard = self.get_object()
        serializer = self.serializer_class(hazard)
        return Response({"result": serializer.data}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        hazard = self.get_object()
        serializer = self.serializer_class(
            instance=hazard, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": serializer.data}, status=status.HTTP_200_OK)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        hazard = self.get_object()
        hazard.delete()
        return Response(
            {"detail": "Hazard Name Deleted Successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )

@class_check_permissions(['ticketing.can_manage_sub_activity'])
class SubActivityViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SubActivitySerializer
    queryset = SubActivity.objects.all()
    filterset_fields = ["is_active"]
    search_fields = ["name"]
    ordering = ["-created_at"]
    pagination_class = ListPagination


    def list(self, request, *args, **kwargs):
        subactivity = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(subactivity)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response


    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = SubActivitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"result": serializer.data}, status=status.HTTP_201_CREATED)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        subactivity = self.get_object()
        serializer = self.serializer_class(subactivity)
        return Response({"result": serializer.data}, status=status.HTTP_200_OK)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        subactivity = self.get_object()
        serializer = self.serializer_class(
            instance=subactivity, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": serializer.data}, status=status.HTTP_200_OK)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, *args, **kwargs):
        subactivity = self.get_object()
        subactivity.delete()
        return Response(
            {"detail": "SubActivity Deleted Successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )

@class_check_permissions(['ticketing.can_manage_truck_description'])
class TruckTypeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = TruckType.objects.all()
    serializer_class = TruckTypeSerializer
    filterset_fields = ["is_active"]
    search_fields = ["type"]
    ordering = ["-created_at"]
    pagination_class = ListPagination

    def list(self, request, *args, **kwargs):
        truck = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(truck)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response


    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = TruckTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"result": serializer.data}, status=status.HTTP_201_CREATED)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        truck = self.get_object()
        serializer = self.serializer_class(truck)
        return Response({"result": serializer.data}, status=status.HTTP_200_OK)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        truck = self.get_object()
        serializer = self.serializer_class(
            instance=truck, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": serializer.data}, status=status.HTTP_200_OK)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        truck = self.get_object()
        truck.delete()
        return Response(
            {"detail": "Truck Type Deleted Successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )


class ContractorRateMatrixViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ContractorRateMatrix.objects.all()
    serializer_class = ContractorRateMatrixSerializer
    filterset_fields = ["project"]
    pagination_class = ListPagination
    ordering = ["-created_at"]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response

    def create(self, request, *args, **kwargs):
        serializer = ContractorRateMatrixModifySerializer(data=request.data)
        if serializer.is_valid():
            matrix = serializer.save()
            matrix_serializer = self.serializer_class(matrix)
            return Response(
                {"result": matrix_serializer.data}, status=status.HTTP_201_CREATED
            )

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        matrix = self.get_object()
        serializer = ContractorRateMatrixModifySerializer(
            instance=matrix, data=request.data, partial=True
        )
        if serializer.is_valid():
            matrix = serializer.save()
            matrix_serializer = self.serializer_class(matrix)
            return Response(
                {"result": matrix_serializer.data}, status=status.HTTP_200_OK
            )

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        matrix = self.get_object()
        matrix.delete()
        return Response(
            {"detail": "Contractor Rate Matrix Deleted Successfully"},
            status=status.HTTP_200_OK,
        )




# PermissionViewSet is the Crud for permissions with 4 methods
class PermissionViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserPermissionSerializer
    permission_classes = [IsAuthenticated]
    filterset_class = UserFilter # UserFilter is a custom filter class to filter the users based on the role id 
    # reason for using this is that the user model does not have a role field, role is a foreign key to the role model
    search_fields = ["role__id"]
    
# get_all_permissions: this method is used to get all the permissions available in the system
    @action(detail=False, methods=['get'])
    def get_all_permissions(self,request, *args, **kwargs):
        permissions = Permission.objects.all()
        serializer = PermissionSerializer(permissions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# list: this method is used to list all the users with their permissions
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# update: this method is used to update the permissions of a user using a json object with permission codename as key and boolean as value
    @transaction.atomic
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        for permission_codename, is_active in request.data.items():
            permission = Permission.objects.get(codename=permission_codename)
            if is_active:
                user.user_permissions.add(permission)
            else:
                user.user_permissions.remove(permission)
        return Response({'status': 'permissions updated'}, status=status.HTTP_200_OK)
    
# retrieve: this method is used to get the permissions of a user using the user id
# this only returns the active permissions of the user
    def retrieve(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
