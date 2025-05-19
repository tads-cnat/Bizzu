from django.contrib import admin
from ..models.comentario import Comentario


class ComentarioAdmin(admin.ModelAdmin):
    pass


admin.site.register(Comentario, ComentarioAdmin)
