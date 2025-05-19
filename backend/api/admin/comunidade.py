from django.contrib import admin
from ..models.comunidade import Comunidade


class ComunidadeAdmin(admin.ModelAdmin):
    pass


admin.site.register(Comunidade, ComunidadeAdmin)
