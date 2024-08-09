import uuid
from datetime import datetime

import boto3
from botocore.exceptions import NoCredentialsError
from django.conf import settings

ACCEPTABLE_DIRECTORIES = [
    "users",
    "disposal_sites",
    "tickets",
]

PERMISSION_GROUPS = [("Administration", "Administration"), ("Event", "Event")]


def error_handler(errors):
    error_message = ""
    for field, messages in errors.items():
        if isinstance(messages, list):
            for message in messages:
                if hasattr(message, "code") and (
                    message.code == "required"
                    or message.code == "invalid"
                    or message.code == "null"
                    or message.code == "max_value"
                    or message.code == "min_value"
                ):
                    error_message = f"{field}: {message}"
                elif hasattr(message, "code") and message.code == "does_not_exist":
                    error_message = f"{field}: Not Found"
                elif type(message) == dict:
                    return error_handler(message)
                else:
                    error_message = message

                return error_message
        elif isinstance(messages, dict):
            error_message = error_handler(messages)

    return error_message


def upload_to_s3(file, key):
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_STORAGE_REGION,
        config=boto3.session.Config(signature_version="s3v4"),
    )

    s3_client.upload_fileobj(file, settings.AWS_STORAGE_BUCKET_NAME, key)


def upload_to(parent_folder, file):
    name = file.name

    key = f"{parent_folder}/" + str(uuid.uuid4()) + "/" + name
    return key


def generate_pre_signed_url(object_key):
    try:
        s3_client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_STORAGE_REGION,
            config=boto3.session.Config(signature_version="s3v4"),
        )

        url = s3_client.generate_presigned_url(
            "get_object",
            Params={"Bucket": settings.AWS_STORAGE_BUCKET_NAME, "Key": object_key},
            ExpiresIn=86400,  # 24 hours
        )

        return url

    except NoCredentialsError:
        return None
