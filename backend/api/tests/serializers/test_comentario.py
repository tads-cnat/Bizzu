from django.db.utils import IntegrityError
from django.test import TestCase
from api.serializers.comentario import ComentarioSerializer, ComentarioCreateSerializer
from api.models.comentario import Comentario
from api.models.usuario import Usuario
from api.models.postagem import Postagem
from api.models.comunidade import Comunidade
from api.models.categoria import Categoria


class ComentarioTestSerializer(TestCase):
    comentario = None
    usuario = None
    postagem = None
    comunidade = None
    categorias = None

    def setUp(self):
        self.usuario = Usuario.objects.create(
            nome="Janilson", descricao="Estudante de TI", papel="int", username="jambas"
        )
        self.comunidade = Comunidade.objects.create(
            nome="TADS",
            descricao="Comunidade do curso de TADS",
            anoFundacao="2012-05-01",
            coordenacao="Marília Freire",
        )
        self.categorias = Categoria.objects.create(
            nome="Teste de software",
            tipo="mat",
        )

        self.postagem = Postagem.objects.create(
            texto="Um texto para uma postagem",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )
        self.postagem.categorias.add(self.categorias)
        self.comentario = Comentario.objects.create(
            usuario=self.usuario,
            postagem=self.postagem,
            conteudo="Um conteúdo bem legal para comentar nessa postagem",
        )

    def test_serializer_valid_output(self):
        serializer = ComentarioSerializer(instance=self.comentario)
        data = serializer.data

        self.assertEqual(data["postagem"], self.postagem.id)
        self.assertEqual(data["usuario"]["id"], self.usuario.id)
        self.assertEqual(data["usuario"]["username"], self.usuario.username)
        self.assertEqual(data["conteudo"], self.comentario.conteudo)

    def test_serializer_valid_input(self):
        input = {
            "postagem": self.postagem.id,
            "usuario": self.usuario.id,
            "conteudo": self.comentario.conteudo,
        }

        serializer = ComentarioSerializer(data=input)
        self.assertTrue(serializer.is_valid())

    def test_serializer_missing_post(self):
        input = {
            "usuario": self.usuario.id,
            "conteudo": self.comentario.conteudo,
        }
        serializer = ComentarioSerializer(data=input)
        self.assertFalse(serializer.is_valid())
        self.assertIn("postagem", serializer.errors)

    def test_serializer_missing_user(self):
        input = {
            "postagem": self.postagem.id,
            "conteudo": self.comentario.conteudo,
        }
        serializer = ComentarioSerializer(data=input)
        self.assertTrue(serializer.is_valid())
        with self.assertRaises(IntegrityError):
            serializer.save()

    def test_serializer_missing_content(self):
        input = {
            "usuario": self.usuario.id,
            "postagem": self.postagem.id,
        }
        serializer = ComentarioSerializer(data=input)
        self.assertFalse(serializer.is_valid())

        self.assertIn("conteudo", serializer.errors)

    def test_serializer_max_content(self):
        max_content = "a" * 501
        input = {
            "usuario": self.usuario.id,
            "postagem": self.postagem.id,
            "conteudo": max_content,
        }
        serializer = ComentarioSerializer(data=input)
        self.assertFalse(serializer.is_valid())

        self.assertIn("conteudo", serializer.errors)

    def test_serializer_min_content(self):
        min_content = "a" * 15
        input = {
            "usuario": self.usuario.id,
            "postagem": self.postagem.id,
            "conteudo": min_content,
        }
        serializer = ComentarioSerializer(data=input)
        self.assertFalse(serializer.is_valid())

        self.assertIn("conteudo", serializer.errors)


class ComentarioCreateSerializerTest(TestCase):
    def setUp(self):
        self.usuario = Usuario.objects.create(
            nome="Janilson", descricao="Estudante de TI", papel="int", username="jambas"
        )
        self.comunidade = Comunidade.objects.create(
            nome="TADS",
            descricao="Comunidade do curso de TADS",
            anoFundacao="2012-05-01",
            coordenacao="Marília Freire",
        )
        self.categoria = Categoria.objects.create(
            nome="Teste de software",
            tipo="mat",
        )

        self.postagem = Postagem.objects.create(
            texto="Um texto para uma postagem",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )
        self.postagem.categorias.add(self.categoria)

    def test_serializer_valid(self):
        data = {"conteudo": "Comentário válido", "postagem": self.postagem.id}
        serializer = ComentarioCreateSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        comentario = serializer.save(usuario=self.usuario)
        self.assertEqual(comentario.conteudo, data["conteudo"])
        self.assertEqual(comentario.postagem, self.postagem)
        self.assertEqual(comentario.usuario, self.usuario)

    def test_serializer_empty_content(self):
        data = {"postagem": self.postagem.id}
        serializer = ComentarioCreateSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("conteudo", serializer.errors)

    def test_serializer_content_too_long(self):
        data = {"conteudo": "a" * 501, "postagem": self.postagem.id}
        serializer = ComentarioCreateSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("conteudo", serializer.errors)

    def test_serializer_missing_post(self):
        data = {"conteudo": "Comentário sem postagem"}
        serializer = ComentarioCreateSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("postagem", serializer.errors)
