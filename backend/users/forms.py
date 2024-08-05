import unicodedata
from django.contrib.auth import get_user_model, forms
from django.contrib.auth.forms import UsernameField
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django import forms as django_forms

User = get_user_model()


class OptionalUsernameField(django_forms.CharField):
    def to_python(self, value):
        value = super().to_python(value)
        if value is None:
            return value
        if self.max_length is not None and len(value) > self.max_length:
            return value
        if value == "":
            return None
        return unicodedata.normalize("NFKC", value)


class UserChangeForm(forms.UserChangeForm):
    username = OptionalUsernameField(required=False)

    class Meta(forms.UserChangeForm.Meta):
        model = User


class UserCreationForm(forms.UserCreationForm):

    class Meta(forms.UserCreationForm.Meta):
        model = User
