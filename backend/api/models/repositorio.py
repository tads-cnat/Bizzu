from django.db import models
from .comunidade import Comunidade
from .categoria import Categoria


class Repositorio(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    titulo = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    dataPublicacao = models.DateTimeField(
        auto_now_add=True, verbose_name="Data de publicação"
    )
    usuario = models.ForeignKey(
        "Usuario",
        verbose_name="Usuário",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="repositorios",
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
        return f"{self.descricao[:20]}"

    class Meta:
        verbose_name = "Repositorio"
        verbose_name_plural = "Repositorios"
