from base.pagination import ListPagination
from base.utils import error_handler
from django.db import transaction
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ticketing.models import SubActivity, TruckType
from ticketing.serializers import SubActivitySerializer, TruckTypeSerializer


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
            {"detail": "SubActivity Deleted Successfully"}, status=status.HTTP_200_OK
        )


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
            {"detail": "Truck Type Deleted Successfully"}, status=status.HTTP_200_OK
        )
