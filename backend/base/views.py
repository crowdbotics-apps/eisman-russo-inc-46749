# Create your views here.
import os

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from base.serializers import FileUploadSerializer
from base.utils import error_handler, upload_to_s3, upload_to, generate_pre_signed_url


class FileUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            try:
                file = serializer.validated_data["file"]
                directory = serializer.validated_data["directory"]
                key = upload_to(directory, file)
                upload_to_s3(file, key)

                _, file_extension = os.path.splitext(file.name)
                file_extension = file_extension[1:]

                url = generate_pre_signed_url(key)
                return Response(
                    {"result": {"key": key, "url": url, "type": file_extension}},
                    status=status.HTTP_201_CREATED,
                )
            except Exception as e:
                return Response(
                    {"detail": "Failed to upload file"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        message = error_handler(serializer.errors)

        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)
