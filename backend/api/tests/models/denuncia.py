from django.test import TestCase
from django.core.exceptions import ValidationError
from ...models.denuncia import Denuncia
from ...models.usuario import Usuario
from ...models.postagem import Postagem
from ...models.repositorio import Repositorio
from ...models.comentario import Comentario


class DenunciaModelTest(TestCase):

    def setUp(self):
        self.usuario = Usuario.objects.create(username="usuario_teste", password="123")
        self.postagem = Postagem.objects.create(
            texto="Post de teste", usuario=self.usuario
        )
        self.repositorio = Repositorio.objects.create(
            nome="Repo Teste", usuario=self.usuario
        )
        self.comentario = Comentario.objects.create(
            texto="Comentário de teste",
            usuario=self.usuario,
            postagem=self.postagem
        )
        self.denuncia = Denuncia.objects.create(
            postagem=self.postagem,
            tipo="ling"
        )

    def test_criacao_com_sucesso(self):
        self.assertEqual(self.denuncia.postagem, self.postagem)
        self.assertEqual(self.denuncia.tipo, "ling")

    def test_str_retorna_texto_correto(self):
        esperado = f"ling denunciado em {self.denuncia.dataDenuncia}"
        self.assertEqual(str(self.denuncia), esperado)

    def test_denuncia_com_tipo_spam(self):
        denuncia_spam = Denuncia.objects.create(
            postagem=self.postagem,
            tipo="spam"
        )
        self.assertEqual(denuncia_spam.tipo, "spam")

    def test_denuncia_com_tipo_discurso_violento(self):
        denuncia_disc = Denuncia.objects.create(
            postagem=self.postagem,
            tipo="dis"
        )
        self.assertEqual(denuncia_disc.tipo, "dis")

    def test_denuncia_com_tipo_odio(self):
        denuncia_odio = Denuncia.objects.create(
            postagem=self.postagem,
            tipo="odio"
        )
        self.assertEqual(denuncia_odio.tipo, "odio")

    def test_denuncia_com_tipo_outros(self):
        denuncia_outro = Denuncia.objects.create(
            postagem=self.postagem,
            tipo="out"
        )
        self.assertEqual(denuncia_outro.tipo, "out")

    def test_denuncia_em_comentario(self):
        denuncia_comentario = Denuncia.objects.create(
            comentario=self.comentario,
            tipo="ling"
        )
        self.assertEqual(denuncia_comentario.comentario, self.comentario)

    def test_denuncia_em_repositorio(self):
        denuncia_repo = Denuncia.objects.create(
            repositorio=self.repositorio,
            tipo="spam"
        )
        self.assertEqual(denuncia_repo.repositorio, self.repositorio)

    def test_erro_comentario_postagem_nao_correspondem(self):
        outro_usuario = Usuario.objects.create(username="outro_usuario", password="123")
        outra_postagem = Postagem.objects.create(
            texto="Outra postagem", usuario=outro_usuario
        )
        outro_comentario = Comentario.objects.create(
            texto="Comentário em outra postagem",
            usuario=outro_usuario,
            postagem=outra_postagem
        )
        
        denuncia_invalida = Denuncia(
            postagem=self.postagem,
            comentario=outro_comentario,
            tipo="ling"
        )
        
        with self.assertRaises(ValidationError):
            denuncia_invalida.full_clean()

    def test_erro_repositorio_e_comentario_juntos(self):
        denuncia_invalida = Denuncia(
            repositorio=self.repositorio,
            comentario=self.comentario,
            tipo="spam"
        )
        
        with self.assertRaises(ValidationError):
            denuncia_invalida.full_clean()

    def test_data_denuncia_automatica(self):
        self.assertIsNotNone(self.denuncia.dataDenuncia)
