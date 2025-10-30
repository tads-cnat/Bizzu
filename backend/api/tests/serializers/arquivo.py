from django.test import TestCase
from api.serializers.arquivo import ArquivoSerializer
from api.models.arquivo import Arquivo
from api.models.repositorio import Repositorio
from api.models.categoria import Categoria
from api.models.usuario import Usuario
from api.models.comunidade import Comunidade
from django.core.files.uploadedfile import SimpleUploadedFile


class PostagemSerializerTest(TestCase):
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

    def test_serialization_valid_output(self):
        serializer = ArquivoSerializer(instance=self.arquivo)
        data = serializer.data

        self.assertEqual(data["repositorio"], self.repositorio.id)
        self.assertEqual(
            data["arquivo"],
            "imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
        )

    def test_serialization_valid_input(self):
        input = {
            "repositorio": self.repositorio.id,
            "arquivo": SimpleUploadedFile(
                "sem_imagem_avatar.png",
                b"arquivo fake de teste",
                content_type="image/png",
            ),
        }

        serializer = ArquivoSerializer(data=input)
        self.assertTrue(serializer.is_valid())

    def test_serialization_invalid_input(self):
        input = {
            "arquivo": "../../imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
            "repositorio": self.repositorio,
        }

        serializer = ArquivoSerializer(data=input)
        self.assertFalse(serializer.is_valid())

        self.assertIn("repositorio", serializer.errors)
        self.assertIn("arquivo", serializer.errors)
