from django.db import models


class Comunidade(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    imagem = models.ImageField(
        upload_to="comunidade_imagens/", verbose_name="Imagem", blank=True, null=True
    )
    nome = models.CharField(verbose_name="Nome", max_length=50)
    descricao = models.CharField(verbose_name="Descrição", max_length=200)
    anoFundacao = models.DateField(verbose_name="Ano de fundação", default=2025)
    banner = models.ImageField(
        verbose_name="Banner", upload_to="banners/%Y/%m/%d/", blank=True, null=True
    )
    coordenacao = models.CharField(verbose_name="Coordenação", max_length=50)
    seguidores = models.ManyToManyField(
        "Usuario",
        symmetrical=False,
        verbose_name="seguidores",
        related_name="comunidades_que_sigo",
        blank=True,
    )

    def __str__(self):
        return self.nome
