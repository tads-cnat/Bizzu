from django.contrib import admin
from .models import Usuario, Postagem, Repositorio, Comentario, Comunidade, Categoria

admin.site.register(Usuario)
admin.site.register(Postagem)
admin.site.register(Repositorio)
admin.site.register(Comentario)
admin.site.register(Comunidade)
admin.site.register(Categoria)