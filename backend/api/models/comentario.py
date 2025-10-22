from django.db import models
from .postagem import Postagem
from .usuario import Usuario
from django.conf import settings
from django.core.validators import MinLengthValidator, MaxLengthValidator


class Comentario(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    postagem = models.ForeignKey(Postagem, on_delete=models.CASCADE)
    conteudo = models.TextField(
        validators=[MinLengthValidator(16), MaxLengthValidator(256)]
    )
    dataPostagem = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comentário de {self.usuario.nome} em {self.dataPostagem}"
