from django.test import TestCase
from django.core.exceptions import ValidationError
from ..models import Categoria
from ..serializers import CategoriaSerializer


class CategoriaModelTest(TestCase):
    """Testes unitários para o modelo Categoria"""

    def setUp(self):
        self.categoria = Categoria.objects.create(
            nome="Tecnologia da Informação",
            tipo="tec"
        )

    def test_criacao_com_sucesso(self):
        """Deve criar uma categoria corretamente"""
        self.assertEqual(self.categoria.nome, "Tecnologia da Informação")
        self.assertEqual(self.categoria.tipo, "tec")

    def test_str_retorna_nome(self):
        """O método __str__ deve retornar o nome"""
        self.assertEqual(str(self.categoria), "Tecnologia da Informação")

    def test_tipo_invalido_dispara_erro(self):
        """Deve gerar erro se tipo for inválido (fora das choices)"""
        categoria_invalida = Categoria(nome="Teste Inválido", tipo="xyz")
        with self.assertRaises(ValidationError):
            categoria_invalida.full_clean()

    def test_nome_vazio_dispara_erro(self):
        """Não deve permitir nome vazio"""
        categoria_vazia = Categoria(nome="", tipo="tec")
        with self.assertRaises(ValidationError):
            categoria_vazia.full_clean()


class CategoriaSerializerTest(TestCase):
    """Testes unitários para o serializer CategoriaSerializer"""

    def setUp(self):
        self.categoria = Categoria.objects.create(
            nome="Matemática",
            tipo="mat"
        )

    def test_serializacao_saida_valida(self):
        """Deve serializar corretamente os dados do model"""
        serializer = CategoriaSerializer(instance=self.categoria)
        data = serializer.data
        self.assertEqual(data["nome"], "Matemática")
        self.assertEqual(data["tipo"], "mat")
        self.assertIn("id", data)

    def test_serializacao_entrada_valida(self):
        """Deve validar e salvar dados corretos"""
        input_data = {"nome": "Período Letivo", "tipo": "per"}
        serializer = CategoriaSerializer(data=input_data)
        self.assertTrue(serializer.is_valid())
        categoria_criada = serializer.save()
        self.assertEqual(categoria_criada.nome, "Período Letivo")

    def test_serializacao_entrada_invalida(self):
        """Deve falhar ao validar dados incorretos"""
        input_data = {"nome": "", "tipo": "inv"}
        serializer = CategoriaSerializer(data=input_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("nome", serializer.errors)
        self.assertIn("tipo", serializer.errors)
