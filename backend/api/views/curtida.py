from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from api.models import Curtida, Postagem
from api.serializers.curtida import CurtidaSerializer

class CurtidaViewSet(viewsets.ModelViewSet):
    queryset = Curtida.objects.all()
    serializer_class = CurtidaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=False, methods=["post"], url_path="toggle")
    def toggle_curtida(self, request):
        postagem_id = request.data.get("postagem_id")

        if not postagem_id:
            return Response({"detail": "postagem_id é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            postagem = Postagem.objects.get(id=postagem_id)
        except Postagem.DoesNotExist:
            return Response({"detail": "Postagem não encontrada."}, status=status.HTTP_404_NOT_FOUND)

        curtida, created = Curtida.objects.get_or_create(usuario=request.user, postagem=postagem)

        if not created:
            curtida.delete()
            return Response({"curtido": False})

        return Response({"curtido": True})
