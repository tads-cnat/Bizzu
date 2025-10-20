from django.core.exceptions import ValidationError
from django.test import TestCase
from api.models.arquivo import Arquivo
from api.models.repositorio import Repositorio
from api.models.categoria import Categoria
from api.models.usuario import Usuario
from api.models.comunidade import Comunidade


class ArquivoTest(TestCase):
    arquivo = None
    repositorio = None
    comunidade = None
    categorias = None
    usuario = None

    def setUp(self):
        self.usuario = Usuario.objects.create(
            nome="Cristina",
            descricao="Estudando tecnologias legais",
            papel="int",
            username="nana",
        )
        self.comunidade = Comunidade.objects.create(
            nome="TADS",
            descricao="Comunidade do curso de TADS",
            anoFundacao="2012-05-01",
            coordenacao="Marília Freire",
        )
        self.categorias = Categoria.objects.create(
            nome="PC",
            tipo="mat",
        )
        self.repositorio = Repositorio.objects.create(
            titulo="Repositório de teste",
            descricao="Para criar repositório precisa descrever o que ele tem",
            dataPublicacao="2025-10-20 10:00",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )
        self.repositorio.categorias.add(self.categorias)
        self.arquivo = Arquivo.objects.create(
            repositorio=self.repositorio,
            arquivo="../../imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
        )

    def test_create_sucess(self):
        self.assertEqual(self.arquivo.repositorio, self.repositorio)
        self.assertEqual(
            self.arquivo.arquivo,
            "../../imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
        )

    def test_repository_required(self):
        arquivo = Arquivo.objects.create(
            arquivo="../../imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
        )
        with self.assertRaises(ValidationError):
            arquivo.full_clean()

    def test_arquivo_required(self):
        arquivo = Arquivo.objects.create(
            repositorio=self.repositorio,
        )
        with self.assertRaises(ValidationError):
            arquivo.full_clean()
