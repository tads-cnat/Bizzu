from django.contrib.auth.models import AbstractUser, Group
from django.db import models


class Usuario(AbstractUser):
    nome = models.CharField(verbose_name="Nome", max_length=50)
    descricao = models.CharField(
        verbose_name="Descrição", max_length=200, blank=True, null=True
    )
    imagemPerfil = models.ImageField(
        verbose_name="Imagem de perfil", upload_to="usuarios/%Y/%m/%d/", null=True
    )
    banner = models.ImageField(
        verbose_name="Banner", upload_to="banners/%Y/%m/%d/", blank=True, null=True
    )

    linkedinUrl = models.URLField(verbose_name="LinkedIn URL", blank=True, null=True)
    escolaFormacao = models.CharField(
        verbose_name="Escola de formação", max_length=30, blank=True, null=True
    )
    instituicaoAtual = models.CharField(
        verbose_name="Instituição atual", max_length=30, blank=True, null=True
    )
    repositoriosFavoritados = models.ManyToManyField(
        "Repositorio",
        verbose_name="Repositórios salvos",
        symmetrical=False,
        related_name="repositorios_favoritados",
        blank=True,
    )
    criado_em = models.DateTimeField(
        auto_now_add=True, verbose_name="Criado em", null=True, blank=True
    )
    segue = models.ManyToManyField(
        "self",
        symmetrical=False,
        verbose_name="Segue",
        related_name="seguido_por",
        blank=True,
    )
    comunidades = models.ManyToManyField(
        "Comunidade", verbose_name="Comunidades", related_name="seguido_por", blank=True
    )
    PERFIS = (("mod", "moderador"), ("int", "internauta"))
    papel = models.CharField(verbose_name="Papel", null=True, choices=PERFIS)

    def __str__(self):
        return self.username


class Solicitacao(models.Model):
    descricao = models.CharField(
        verbose_name="Descrição", max_length=400, blank=True, null=True
    )
    solicitante = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    data_solocitacao = models.DateTimeField(
        auto_now_add=True, verbose_name="Data da solicitação", null=True, blank=True
    )
