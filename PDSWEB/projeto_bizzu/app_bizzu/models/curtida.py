from django.db import models
from app_bizzu.models.postagem import Postagem
from app_bizzu.models.usuario import Usuario

class Curtida(models.Model):
    usuario = models.ForeignKey(Usuario, verbose_name="Usuário", on_delete=models.CASCADE, related_name="usuario_curtida")
    postagem = models.ForeignKey(Postagem, verbose_name="Postagem", on_delete=models.CASCADE, related_name="postagem_curtida")

    def __str__(self):
        return f"{self.usuario} curtiu {self.postagem}"
