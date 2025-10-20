from django.test import TestCase
from api.serializers.postagem import PostagemSerializer
from api.models.postagem import Postagem
from api.models.categoria import Categoria
from api.models.usuario import Usuario
from api.models.comunidade import Comunidade
from django.core.files.uploadedfile import SimpleUploadedFile


class PostagemSerializerTest(TestCase):
    postagem = None
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
        self.postagem = Postagem.objects.create(
            texto="Uma postagem de teste",
            imagem="usuarios/2025/06/10/sem_imagem_avatar.png",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )
        self.postagem.categorias.add(self.categorias)

    def test_serialization_valid_output(self):
        serializer = PostagemSerializer(instance=self.postagem)
        data = serializer.data
        self.assertEqual(data["texto"], "Uma postagem de teste")
        self.assertEqual(
            data["imagem"],
            "/imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
        )
        self.assertEqual(data["usuario"], self.usuario.id)
        self.assertEqual(data["comunidade"], self.comunidade.id)
        self.assertQuerySetEqual(
            self.postagem.categorias.all(),
            [self.categorias],
            transform=lambda x: x,
        )

    def test_serialization_valid_input(self):
        input = {
            "texto": "Aprendendo sobre DRF",
            "imagem": SimpleUploadedFile(
                "sem_imagem_avatar.png",
                b"arquivo fake de teste",
                content_type="image/png",
            ),
            "usuario": self.usuario.id,
            "comunidade": self.comunidade.id,
            "categorias": [self.categorias.id],
        }

        serializer = PostagemSerializer(data=input)
        self.assertTrue(serializer.is_valid())

    def test_serialization_invalid_input(self):
        input = {
            "texto": "",
            "imagem": "imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.pdf",
            "usuario": "1",
            "comunidade": "1",
            "categorias": [self.categorias.id],
        }

        serializer = PostagemSerializer(data=input)
        self.assertFalse(serializer.is_valid())

        self.assertIn("texto", serializer.errors)
        self.assertIn("imagem", serializer.errors)
        self.assertIn("usuario", serializer.errors)
        self.assertIn("comunidade", serializer.errors)
        self.assertIn("categorias", serializer.errors)
