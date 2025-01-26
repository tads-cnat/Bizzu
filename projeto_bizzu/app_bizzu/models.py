from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator
import os

class Usuario(AbstractUser):
    nome = models.CharField(verbose_name="Nome", max_length=50)
    descricao = models.CharField(verbose_name="Descrição", max_length=200)
    imagemPerfil = models.ImageField(verbose_name="Imagem de perfil", upload_to="usuarios/%Y/%m/%d/", null=True)
    escolaFormacao = models.CharField(verbose_name="Escola de formação", max_length=30, blank=True, null=True)
    instituicaoAtual = models.CharField(verbose_name="Instituição atual", max_length=30, blank=True, null=True)
    localTrabalho = models.CharField(verbose_name="Local de trabalho", max_length=30, blank=True, null=True)
    progressoCurso = models.CharField(verbose_name="Progresso no curso", max_length=20, blank=True, null=True)
    repositoriosFavoritados = models.ManyToManyField("Repositorio", verbose_name="Repositórios salvos", symmetrical=False,related_name="repositorios_favoritados", blank=True)
    criado_em = models.DateTimeField(auto_now_add=True, verbose_name="Criado em", null=True, blank=True)
    # seguidores = models.ManyToManyField("self", through="UsuarioSeguidores", symmetrical=False, verbose_name="Seguidores", related_name="seguindo")

    def __str__(self):
        return self.username


# class Usuario(models.Model):
#     nome = models.CharField(verbose_name="Nome", max_length=50)
#     username = models.CharField(
#     verbose_name="Nome de Usuário",
#     max_length=20,
#     unique=True,
#     validators=[RegexValidator(regex=r"^[a-zA-Z0-9_]+$", message="Somente letras, números e underscores são permitidos.")], 
#     )   
    # descricao = models.CharField(verbose_name="Descrição", max_length=200)
    # imagemPerfil = models.ImageField(verbose_name="Imagem de perfil", upload_to="usuarios/%Y/%m/%d/")
    # escolaFormacao = models.CharField(verbose_name="Escola de formação", max_length=30, blank=True, null=True)
    # instituicaoAtual = models.CharField(verbose_name="Instituição atual", max_length=30, blank=True, null=True)
    # localTrabalho = models.CharField(verbose_name="Local de trabalho", max_length=30, blank=True, null=True)
    # progressoCurso = models.CharField(verbose_name="Progresso no curso", max_length=20, blank=True, null=True)
    # repositoriosFavoritados = models.ManyToManyField("Repositorio", verbose_name="Repositórios salvos", symmetrical=False,related_name="repositorios_favoritados", blank=True)
    # created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    # seguidores = models.ManyToManyField("self", through="UsuarioSeguidores", symmetrical=False, verbose_name="Seguidores", related_name="segue")


#     class Meta:
#         verbose_name = "Usuário"
#         verbose_name_plural = "Usuários"

#     def __str__(self):
#         return self.username

# class UsuarioSeguidores(models.Model):
#     seguidor = models.ForeignKey("Usuario", related_name="segue", on_delete=models.CASCADE)
#     seguido = models.ForeignKey("Usuario", related_name="seguidores", on_delete=models.CASCADE)

class Comunidade(models.Model):
    nome = models.CharField(verbose_name="Nome", max_length= 50)
    descricao = models.CharField(verbose_name="Descrição", max_length= 200)
    anoFundacao = models.DateField(verbose_name="Ano de fundação")
    coordenacao = models.CharField(verbose_name="Coordenação", max_length= 50)
    linkPPC = models.URLField(verbose_name="Link ppc")
    linkHorarios = models.URLField(verbose_name="Link horários")
    linkExtra = models.URLField(verbose_name="Link extra")
    seguidores = models.ManyToManyField("Usuario", verbose_name="Seguidores", symmetrical=False,related_name="follows",blank=True)

    def __str__(self):
        return self.nome


class Postagem(models.Model):
    texto = models.CharField(verbose_name="Texto de descrição",max_length= 200)
    imagem = models.ImageField(verbose_name="Imagem",upload_to="imgPostagens/")
    dataPublicacao = models.DateTimeField(auto_now_add=True, verbose_name="Data de publicação")
    usuario = models.ForeignKey("Usuario", verbose_name="Usuário", on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.texto

class Repositorio(models.Model):
    dataPublicacao = models.DateTimeField(verbose_name="Data de publicação", auto_now_add=True)
    descricao = models.CharField(verbose_name="Descrição",max_length= 200)
    titulo = models.CharField(verbose_name="Título", max_length= 50)
    comunidade = models.ForeignKey(Comunidade,  verbose_name="Comunidade", on_delete=models.CASCADE, null=True, blank=True, default=None)
    usuario = models.ForeignKey("Usuario", verbose_name="Usuário", on_delete=models.CASCADE, null=True, blank=True, default=None)
    arquivo = models.FileField(verbose_name="Arquivos anexados", default=None)

    def __str__(self):
        return self.titulo

class Comentario(models.Model):
    conteudo = models.CharField(verbose_name="Conteudo",max_length= 300)
    dataPostagem = models.DateTimeField(verbose_name="Data de postagem")
    postagem = models.ForeignKey("Postagem", verbose_name="Postagem", on_delete=models.CASCADE, related_name="comentarios", null=True, blank=True)
    usuario = models.ForeignKey("Usuario", verbose_name="Usuário", on_delete=models.CASCADE, null=True, blank=True)


    def __str__(self):
        return self.conteudo

class Categoria(models.Model):
    TIPOS = (("tec", "Tecnologia"), ("mat", "Matéria"), ("per", "Período"))
    nome = models.CharField(verbose_name="Nome", max_length= 50)
    tipo = models.CharField(verbose_name="Tipo",max_length= 50, choices=TIPOS)

    def __str__(self):
        return self.nome

# class Curtida(models.Model): Discuti sobre a real necessidade 
