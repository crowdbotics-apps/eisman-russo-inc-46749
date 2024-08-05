from rest_framework import serializers

from base.utils import ACCEPTABLE_DIRECTORIES


class FileUploadSerializer(serializers.Serializer):
    # Define fields if needed
    file = serializers.FileField()
    directory = serializers.CharField()

    def validate_directory(self, value):
        if value not in ACCEPTABLE_DIRECTORIES:
            raise serializers.ValidationError(
                {
                    "directory": [
                        f"Directory must be one of {', '.join(ACCEPTABLE_DIRECTORIES)}."
                    ]
                }
            )
        return value


# Compare this snippet from modules/urls.py:
