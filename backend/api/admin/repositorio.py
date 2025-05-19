from django.contrib import admin
from ..models.repositorio import Repositorio


class RepositorioAdmin(admin.ModelAdmin):
    pass


admin.site.register(Repositorio, RepositorioAdmin)
