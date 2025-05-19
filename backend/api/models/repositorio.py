
import uuid
from django.db import models


class Repositorio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    dataPublicacao = models.DateTimeField(
        auto_now_add=True, verbose_name="Data de publicação"
    )

    def __str__(self):
        return f"{self.nome} - {self.descricao[:20]}"

    class Meta:
        verbose_name = "Repositorio"
        verbose_name_plural = "Repositorios"


# Posteriormente é necessário adicionar os relacionamentos de usuário, categoria, comunidade, postagem, arquivos
