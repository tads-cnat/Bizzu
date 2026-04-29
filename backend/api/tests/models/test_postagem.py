from datetime import datetime as date
from django.test import TestCase
from django.core.exceptions import ValidationError
from api.models.postagem import Postagem
from api.models.categoria import Categoria
from api.models.usuario import Usuario
from django.core.files.uploadedfile import SimpleUploadedFile

from api.models.comunidade import Comunidade


class PostagemTest(TestCase):
    postagem = None
    comunidade = None
    categorias = None
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
        self.categorias = Categoria.objects.create(
            nome="PC",
            tipo="mat",
        )
        self.postagem = Postagem.objects.create(
            texto="desenvolvi um projeto em django rest",
            imagem="imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )
        self.postagem.categorias.add(self.categorias)

    def test_create_sucess(self):
        self.assertEqual(self.postagem.texto, "desenvolvi um projeto em django rest")
        self.assertEqual(
            self.postagem.imagem,
            "imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
        )
        self.assertTrue(isinstance(self.postagem.dataPublicacao, date))
        self.assertEqual(self.postagem.usuario, self.usuario)
        self.assertEqual(self.postagem.comunidade, self.comunidade)
        self.assertQuerySetEqual(
            self.postagem.categorias.all(),
            [self.categorias],
            transform=lambda x: x,
        )

    def test_text_required(self):
        postagem = Postagem(
            usuario=self.usuario,
            comunidade=self.comunidade,
            imagem=SimpleUploadedFile(
                "sem_imagem_avatar.png",
                b"fake image content",
                content_type="image/png",
            ),
        )
        postagem.save()
        postagem.categorias.add(self.categorias)

        with self.assertRaises(ValidationError):
            postagem.full_clean()

    def test_max_text_length(self):
        postagem = Postagem(
            texto="A programação é uma arte que une lógica e criatividade. "
            "Cada linha de código representa uma instrução, mas juntas formam sistemas "
            "complexos que impactam o mundo. Dominar linguagens e estruturas super legais",
            imagem="imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )

        with self.assertRaises(ValidationError):
            postagem.full_clean()

    def test_min_text_length(self):
        postagem = Postagem(
            texto="👍🏾",
            imagem="imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )
        postagem.save()
        postagem.categorias.add(self.categorias)

        self.assertEqual(postagem.texto, "👍🏾")

    def test_community_required(self):
        postagem = Postagem(
            texto="Uma postagem de teste",
            imagem="imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
            usuario=self.usuario,
        )

        postagem.save()
        postagem.categorias.add(self.categorias)

        with self.assertRaises(ValidationError):
            postagem.full_clean()

    def test_category_required(self):
        postagem = Postagem(
            texto="desenvolvi um projeto em django rest",
            imagem=SimpleUploadedFile(
                "rest.png",
                b"fake image content",
                content_type="image/png",
            ),
            comunidade=self.comunidade,
            usuario=self.usuario,
        )

        postagem.save()

        with self.assertRaises(ValidationError):
            postagem.full_clean()
