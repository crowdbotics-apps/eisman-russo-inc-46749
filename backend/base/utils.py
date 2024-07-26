

def error_handler(errors):
    error_message = ""
    for field, messages in errors.items():
        for message in messages:
            if message.code == 'required' or message.code == 'invalid':
                error_message = f"{field}: {message}"
            else:
                error_message = message

            return error_message

    return error_message
