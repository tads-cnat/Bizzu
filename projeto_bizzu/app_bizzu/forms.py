# from django import forms
# from django.contrib.auth.forms import UserCreationForm, UserChangeForm
# from .models import Usuario

# class UsuarioCreationForm(UserCreationForm):
#     class Meta:
#         model = Usuario
#         fields = [
#             'username', 
#             "password1", 
#             "password2",
#             'email', 
#             'descricao',
#             "escolaFormacao",
#             "imagemPerfil",
#             "localTrabalho",
#             "progressoCurso",
#             "instituicaoAtual",
#         ]

# class UsuarioChangeForm(UserChangeForm):
#     class Meta:
#         model = Usuario
#         fields = [
#                 "nome","username", "email","imagemPerfil","escolaFormacao","localTrabalho","progressoCurso","instituicaoAtual",  # Apenas campos existentes
#             ]
