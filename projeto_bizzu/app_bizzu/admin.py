from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# from .forms import UsuarioCreationForm, UsuarioChangeForm
from .models import Usuario, Postagem, Repositorio, Comentario, Comunidade, Categoria

admin.site.register(Postagem)
admin.site.register(Repositorio)
admin.site.register(Comentario)
admin.site.register(Comunidade)
admin.site.register(Categoria)

@admin.register(Usuario)
class CustomUsuarioAdmin(UserAdmin):
    # add_form = UsuarioCreationForm
    # form = UsuarioChangeForm
    model = Usuario
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {
            "classes": ("wide",),
            "fields": (
                "nome", "username", "email", "password1", "password2", "imagemPerfil", 
                "escolaFormacao", "localTrabalho", "progressoCurso", "instituicaoAtual",
            ),
        }),
    )

    fieldsets = UserAdmin.fieldsets + (
        ("Informações Personalizadas", {
            "classes": ("wide",),
            "fields": (
                "nome", "imagemPerfil", "escolaFormacao", "localTrabalho", "progressoCurso", "instituicaoAtual",
            ),
        }),
    )