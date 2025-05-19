from django.contrib.auth.models import AbstractUser, Group
from django.db import models


class Usuario(AbstractUser):
    nome = models.CharField(verbose_name="Nome", max_length=50)
    descricao = models.CharField(verbose_name="Descrição", max_length=200)
    imagemPerfil = models.ImageField(
        verbose_name="Imagem de perfil", upload_to="usuarios/%Y/%m/%d/", null=True
    )
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
        default=0,
        blank=True,
    )  # quem eu sigo
    seguidores = models.ManyToManyField(
        "self",
        symmetrical=False,
        verbose_name="Seguidores",
        related_name="seguindo",
        default=0,
        blank=True,
    )  # quem me segue
    comunidades = models.ManyToManyField(
        "Comunidade", verbose_name="Comunidades", related_name="seguido_por", blank=True
    )
    grupo = models.ForeignKey(
        to=Group,
        verbose_name="Grupo",
        on_delete=models.CASCADE,
        related_name="Grupo",
        null=True,
    )

    def __str__(self):
        return self.username


# Com a criação dos groups vamos conseguir diferenciar quando um usuário é comum ou moderador e apenas adicionar posteriormente classes de permissão
