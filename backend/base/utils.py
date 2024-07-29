
def error_handler(errors):
    error_message = ""
    for field, messages in errors.items():
        for message in messages:
            if hasattr(message, 'code') and (message.code == 'required' or message.code == 'invalid' or
                                             message.code == 'null' or message.code == 'max_value' or
                                             message.code == 'min_value'):
                error_message = f"{field}: {message}"
            elif type(message) == dict:
                return error_handler(message)
            else:
                error_message = message

            return error_message

    return error_message
