from django.db import models
import uuid


class Comunidade(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    imagem = models.ImageField(
        upload_to="comunidade_imagens/", verbose_name="Imagem", blank=True, null=True
    )
    nome = models.CharField(verbose_name="Nome", max_length=50)
    descricao = models.CharField(verbose_name="Descrição", max_length=200)
    anoFundacao = models.DateField(verbose_name="Ano de fundação", default=2025)
    coordenacao = models.CharField(verbose_name="Coordenação", max_length=50)
    linkPPC = models.URLField(verbose_name="Link ppc")
    linkHorarios = models.URLField(verbose_name="Link horários")
    linkExtra = models.URLField(verbose_name="Link extra")
    # seguidores = models.ManyToManyField("Usuario", verbose_name="Seguidores", symmetrical=False,related_name="follows",blank=True)

    def __str__(self):
        return self.nome
