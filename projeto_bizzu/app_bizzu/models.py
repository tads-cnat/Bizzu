from django.db import models
import os

class Usuario(models.Model):
    nome = models.CharField(verbose_name="Nome", max_length= 50)
    username = models.CharField(verbose_name="Username", max_length= 20)
    descricao = models.CharField(verbose_name="Descrição", max_length= 200)
    escolaFormacao = models.CharField(verbose_name="Escola de formação", max_length= 70)
    instituicaoAtual = models.CharField(verbose_name="Instituição atual", max_length= 70)
    localTrabalho = models.CharField(verbose_name="Local de trabalho", max_length= 70)
    progressoCurso = models.CharField(verbose_name="Progresso no curso", max_length= 20)
    seguidores = models.ManyToManyField("Usuario", verbose_name="Seguidores", symmetrical=False,related_name="followes")
    repositoriosFavoritados = models.ManyToManyField("Repositorio", verbose_name="Repositórios salvos", symmetrical=False,related_name="repositoriosFavoritados")

    def __str__(self):
        return self.username

class Comunidade(models.Model):
    nome = models.CharField(verbose_name="Nome", max_length= 50)
    descricao = models.CharField(verbose_name="Descrição", max_length= 200)
    anoFundacao = models.DateField(verbose_name="Ano de fundação")
    coordenacao = models.CharField(verbose_name="Coordenação", max_length= 50)
    linkPPC = models.URLField(verbose_name="Link ppc")
    linkHorarios = models.URLField(verbose_name="Link horários")
    linkExtra = models.URLField(verbose_name="Link extra")
    seguidores = models.ManyToManyField("Comunidade", verbose_name="Seguidores", symmetrical=False,related_name="follows")

class Postagem(models.Model):
    texto = models.CharField(verbose_name="Texto de descrição",max_length= 200)
    imagem = models.ImageField(verbose_name="Imagem",upload_to="imgPostagens/")
    dataPublicacao = models.DateTimeField(verbose_name="Data de publicação",)

    def __str__(self):
        return self.texto

class Repositorio(models.Model):
    dataPublicacao = models.DateTimeField(verbose_name="Data de publicação")
    descricao = models.CharField(verbose_name="Descrição",max_length= 200)
    titulo = models.CharField(verbose_name="Título", max_length= 50)

    def __str__(self):
        return self.titulo

class Comentario(models.Model):
    conteudo = models.CharField(verbose_name="Conteudo",max_length= 300)
    dataPostagem = models.DateTimeField(verbose_name="Data de postagem")

    def __str__(self):
        return self.conteudo

class Categoria(models.Model):
    TIPOS = (("tec", "Tecnologia"), ("mat", "Matéria"), ("per", "Período"))
    nome = models.CharField(verbose_name="Nome", max_length= 50)
    tipo = models.CharField(verbose_name="Tipo",max_length= 50, choices=TIPOS)

    def __str__(self):
        return self.nome

# class Curtida(models.Model): Discuti sobre a real necessidade 
