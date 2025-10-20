from datetime import datetime as date
from django.test import TestCase
from jsonschema import ValidationError
from api.models.postagem import Postagem
from api.models.categoria import Categoria
from api.models.usuario import Usuario
from api.models.comunidade import Comunidade


class PostagemTest(TestCase):
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
            imagem="imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )
        self.postagem.categorias.add(self.categorias)

    def test_create_sucess(self):
        self.assertEqual(self.postagem.texto, "Uma postagem de teste")
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
        postagem = Postagem.objects.create(
            imagem="imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )
        self.postagem.categorias.add(self.categorias)
        with self.assertRaises(ValidationError):
            postagem.full_clean()

    def test_text_length(self):
        with self.assertRaisesMessage(
            ValidationError, "O texto deve conter menos de 200 caracteres"
        ):
            Postagem.objects.create(
                texto="texto" * 40,
                imagem="imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
                usuario=self.usuario,
                comunidade=self.comunidade,
            )
            self.postagem.categorias.add(self.categorias)

    def test_community_required(self):
        postagem = Postagem.objects.create(
            texto="Uma postagem de teste",
            imagem="imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png",
            usuario=self.usuario,
        )
        self.postagem.categorias.add(self.categorias)
        with self.assertRaises(ValidationError):
            postagem.full_clean()
