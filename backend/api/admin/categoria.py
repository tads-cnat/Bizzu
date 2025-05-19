from django.contrib import admin
from ..models.categoria import Categoria


class CategoriaAdmin(admin.ModelAdmin):
    pass


admin.site.register(Categoria, CategoriaAdmin)
