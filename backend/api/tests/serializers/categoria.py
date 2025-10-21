from django.test import TestCase
from django.core.exceptions import ValidationError
from ..serializers import CategoriaSerializer

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