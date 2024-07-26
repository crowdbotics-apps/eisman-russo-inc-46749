from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import DebrisType
from .serializers import DebrisSerializer
from base.pagination import ListPagination
from base.utils import error_handler

class DebrisViewSet(viewsets.ModelViewSet):
    queryset = DebrisType.objects.all()
    serializer_class = DebrisSerializer
    filterset_fields = ['debris_name','status']
    pagination_class = ListPagination
    search_fields = ['debris_name']
    ordering = ['-created_at']
    
    def list(self, request):
        debris = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(debris)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(debris, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        serializer = DebrisSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        message = error_handler(serializer.errors)
        return Response({'detail': message}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request):
        debris = self.get_object()
        serializer = self.serializer_class(debris)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request):
        debris = self.get_object()
        serializer = DebrisSerializer(instance=debris, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        debris = get_object_or_404(DebrisType, pk=pk)
        debris.delete()
        return Response({"detail": "Deleted"}, status=status.HTTP_200_OK)