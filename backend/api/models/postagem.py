from django.db import models
import uuid
from .comunidade import Comunidade
from .categoria import Categoria


class Postagem(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    texto = models.CharField(verbose_name="Texto de descrição", max_length=200)
    imagem = models.ImageField(verbose_name="Imagem", upload_to="imgPostagens/")
    dataPublicacao = models.DateTimeField(
        auto_now_add=True, verbose_name="Data de publicação"
    )
    usuario = models.ForeignKey(
        "Usuario",
        verbose_name="Usuário",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="postagens",
    )
    comunidade = models.ForeignKey(
        Comunidade,
        verbose_name="Comunidade",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    categorias = models.ManyToManyField(
        Categoria, verbose_name="Categorias", blank=True
    )

    def __str__(self):
        return self.texto

    class Meta:
        verbose_name = "Postagem"
        verbose_name_plural = "Postagens"
