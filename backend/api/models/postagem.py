from django.db import models
from django.forms import ValidationError
from .comunidade import Comunidade
from .categoria import Categoria


class Postagem(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    texto = models.CharField(verbose_name="Texto de descrição", max_length=200)
    imagem = models.ImageField(
        verbose_name="Imagem", upload_to="imgPostagens/", null=True, blank=True
    )
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
    )
    categorias = models.ManyToManyField(Categoria, verbose_name="Categorias")

    def __str__(self):
        return self.texto

    def clean(self):
        super().clean()

        if not self.pk and not hasattr(self, "_categorias_temp"):
            return
        categorias_count = (
            self.categorias.count()
            if self.pk
            else len(getattr(self, "_categorias_temp", []))
        )
        if categorias_count == 0:
            raise ValidationError(
                {"categorias": "É necessário ter pelo menos uma categoria"}
            )

    class Meta:
        verbose_name = "Postagem"
        verbose_name_plural = "Postagens"
