from django.contrib import admin
from ..models.Repositorio import Repositorio


class RepositorioAdmin(admin.ModelAdmin):
    pass


admin.site.register(Repositorio, RepositorioAdmin)
