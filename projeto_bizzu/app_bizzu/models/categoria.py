from django.db import models

class Categoria(models.Model):
    TIPOS = (("tec", "Tecnologia"), ("mat", "Matéria"), ("per", "Período"))
    nome = models.CharField(verbose_name="Nome", max_length= 50)
    tipo = models.CharField(verbose_name="Tipo",max_length= 50, choices=TIPOS)

    def __str__(self):
        return self.nome
