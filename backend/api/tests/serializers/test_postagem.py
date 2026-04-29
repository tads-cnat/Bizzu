from django.test import TestCase
from api.serializers.postagem import PostagemSerializer
from api.serializers.postagem import PostagemUpdateSerializer
from api.models.postagem import Postagem
from api.models.categoria import Categoria
from api.models.usuario import Usuario
from api.models.comunidade import Comunidade
from django.core.files.uploadedfile import SimpleUploadedFile


class PostagemSerializerTest(TestCase):
    postagem = None
    comunidade = None
    categorias = None
    categoriasRedes = None
    categoria2 = None
    usuario = None

    def setUp(self):
        self.usuario = Usuario.objects.create(
            nome="Ana",
            descricao="Estudando tecnologias legais",
            papel="int",
            username="anaa",
        )
        self.comunidade = Comunidade.objects.create(
            nome="TADS",
            descricao="Comunidade do curso de TADS",
            anoFundacao="2012-05-01",
            coordenacao="Marília Freire",
        )
        self.comunidade = Comunidade.objects.create(
            nome="Redes",
            descricao="Comunidade do curso de Redes",
            anoFundacao="2012-05-01",
            coordenacao="Fulano",
        )
        self.categorias = Categoria.objects.create(
            nome="PC",
            tipo="mat",
        )
        self.categoriasRedes = Categoria.objects.create(
            nome="Django",
            tipo="tec",
        )
        self.postagem = Postagem.objects.create(
            texto="desenvolvi um projeto em django rest",
            usuario=self.usuario,
            comunidade=self.comunidade,
            imagem="/usuarios/2025/06/10/sem_imagem_avatar.png",
        )
        self.postagem.categorias.add(self.categorias)

    def test_serialization_valid_output(self):
        serializer = PostagemSerializer(instance=self.postagem)
        data = serializer.data
        self.assertEqual(data["texto"], "desenvolvi um projeto em django rest")
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

    def test_invalid_input_fileFormat(self):
        input = {
            "texto": "desenvolvi um projeto em django rest",
            "usuario": self.usuario.id,
            "comunidade": self.comunidade.id,
            "categorias": [self.categoriasRedes.id],
            "imagem": SimpleUploadedFile(
                "main.py",
                b"arquivo fake de teste",
                content_type="file/py",
            ),
        }
        serializer = PostagemSerializer(data=input)
        self.assertFalse(serializer.is_valid())

    def test_serialization_invalid_input(self):
        input = {
            "texto": "",
            "arquivo": SimpleUploadedFile(
                "sem_imagem_avatar.png",
                b"arquivo fake de teste",
                content_type="image/png",
            ),
            "usuario": "1",
            "comunidade": "1",
            "categorias": [self.categorias.id],
        }

        serializer = PostagemSerializer(data=input)
        self.assertFalse(serializer.is_valid())


class PostagemUpdateSerializerTest(TestCase):
    postagem = None
    comunidade = None
    categorias = None
    categoriasRedes = None
    categoria2 = None

    def setUp(self):
        self.comunidade = Comunidade.objects.create(
            nome="TADS",
            descricao="Comunidade do curso de TADS",
            anoFundacao="2012-05-01",
            coordenacao="Marília Freire",
        )
        self.comunidade = Comunidade.objects.create(
            nome="Redes",
            descricao="Comunidade do curso de Redes",
            anoFundacao="2012-05-01",
            coordenacao="Fulano",
        )
        self.categorias = Categoria.objects.create(
            nome="PC",
            tipo="mat",
        )
        self.categoriasRedes = Categoria.objects.create(
            nome="Django",
            tipo="tec",
        )
        self.postagem = Postagem.objects.create(
            texto="desenvolvi um projeto em django rest",
            comunidade=self.comunidade,
            imagem="/usuarios/2025/06/10/sem_imagem_avatar.png",
        )
        self.postagem.categorias.add(self.categorias)

    def test_serialization_valid_output(self):
        serializer = PostagemUpdateSerializer(instance=self.postagem)
        data = serializer.data
        self.assertEqual(data["texto"], "desenvolvi um projeto em django rest")
        self.assertEqual(
            data["imagem"],
            "/imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
        )
        self.assertEqual(data["comunidade"], self.comunidade.id)
        self.assertQuerySetEqual(
            self.postagem.categorias.all(),
            [self.categorias],
            transform=lambda x: x,
        )

    def test_invalid_input_fileFormat(self):
        input = {
            "texto": "desenvolvi um projeto em django rest",
            "comunidade": self.comunidade.id,
            "categorias": [self.categoriasRedes.id],
            "imagem": SimpleUploadedFile(
                "main.py",
                b"arquivo fake de teste",
                content_type="file/py",
            ),
        }
        serializer = PostagemUpdateSerializer(data=input)
        self.assertFalse(serializer.is_valid())

    def test_serialization_invalid_input(self):
        input = {
            "texto": "",
            "arquivo": SimpleUploadedFile(
                "sem_imagem_avatar.png",
                b"arquivo fake de teste",
                content_type="image/png",
            ),
            "comunidade": "1",
            "categorias": [self.categorias.id],
        }

        serializer = PostagemUpdateSerializer(data=input)
        self.assertFalse(serializer.is_valid())
