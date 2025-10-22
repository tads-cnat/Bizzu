from django.core.exceptions import ValidationError
from django.test import TestCase
from api.models.comentario import Comentario
from api.models.usuario import Usuario
from api.models.postagem import Postagem
from api.models.comunidade import Comunidade
from api.models.categoria import Categoria


class ComentarioTest(TestCase):
    comentario = None
    usuario = None
    postagem = None
    comunidade = None
    categoria = None

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

        self.postagem.categorias.add(self.categoria)
        self.postagem = Postagem.objects.create(
            texto="Um texto para uma postagem",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )
        self.comentario = Comentario.objects.create(
            usuario=self.usuario,
            postagem=self.postagem,
            conteudo="Um conteúdo bem legal para comentar nessa postagem",
        )

    def test_create_success(self):
        self.assertEqual(self.comentario.usuario, self.comentario)
        self.assertEqual(self.comentario.postagem, self.postagem)

    def test_user_required(self):
        comentario = Comentario(
            postagem=self.postagem,
            conteudo="Um conteúdo bem legal para comentar nessa postagem",
        )
        with self.assertRaises(ValidationError):
            comentario.full_clean()

    def test_post_required(self):
        comentario = Comentario(
            usuario=self.usuario,
            conteudo="Um conteúdo bem legal para comentar nessa postagem",
        )
        with self.assertRaises(ValidationError):
            comentario.full_clean()

    def test_content_required(self):
        comentario = Comentario(
            usuario=self.usuario,
            postagem=self.postagem,
        )
        with self.assertRaises(ValidationError):
            comentario.full_clean()

    def test_max_length_content(self):
        comentario_longo = "a" * 501
        comentario = Comentario(
            usuario=self.usuario,
            postagem=self.postagem,
            conteudo=comentario_longo,
        )
        with self.assertRaises(ValidationError):
            comentario.full_clean()

    def test_min_length_content(self):
        comentario_pequeno = "a" * 15
        comentario = Comentario(
            usuario=self.usuario,
            postagem=self.postagem,
            conteudo=comentario_pequeno,
        )
        with self.assertRaises(ValidationError):
            comentario.full_clean()
