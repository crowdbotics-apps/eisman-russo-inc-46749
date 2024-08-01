
def error_handler(errors):
    error_message = ""
    for field, messages in errors.items():
        if isinstance(messages, list):
            for message in messages:
                if hasattr(message, 'code') and (message.code == 'required' or message.code == 'invalid' or
                                                 message.code == 'null' or message.code == 'max_value' or
                                                 message.code == 'min_value'):
                    error_message = f"{field}: {message}"
                elif hasattr(message, 'code') and message.code == 'does_not_exist':
                    error_message = f"{field}: Not Found"
                elif type(message) == dict:
                    return error_handler(message)
                else:
                    error_message = message

                return error_message
        elif isinstance(messages, dict):
            error_message = error_handler(messages)

    return error_message
