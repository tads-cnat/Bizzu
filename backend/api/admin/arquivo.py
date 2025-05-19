from django.contrib import admin
from ..models.arquivo import Arquivo


class ArquivoAdmin(admin.ModelAdmin):
    pass


admin.site.register(Arquivo, ArquivoAdmin)
