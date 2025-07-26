from django.contrib import admin
from ..models.comentario import Comentario


@admin.register(Comentario)
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ['id', 'usuario', 'postagem', 'conteudo', 'dataPostagem']
    list_filter = ['dataPostagem', 'usuario']
    search_fields = ['conteudo', 'usuario__username', 'usuario__nome']
    readonly_fields = ['id', 'dataPostagem']
    ordering = ['-dataPostagem']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('usuario', 'postagem')
