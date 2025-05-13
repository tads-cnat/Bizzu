import uuid
from django.db import models


class Postagem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    texto = models.CharField(verbose_name="Texto de descrição", max_length=200)
    imagem = models.ImageField(verbose_name="Imagem", upload_to="imgPostagens/")
    dataPublicacao = models.DateTimeField(
        auto_now_add=True, verbose_name="Data de publicação"
    )

    def __str__(self):
        return self.texto

    class Meta:
        verbose_name = "Postagem"
        verbose_name_plural = "Postagens"


# Posteriormente é necessário adicionar os relacionamentos de usuário, categoria, comunidade
