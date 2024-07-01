from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import Poll, Choice
from .serializers import PollSerializer, ChoiceSerializer

class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        poll = self.get_object()
        choice_id = request.data.get('choice_id')
        try:
            choice = poll.choices.get(id=choice_id)
            choice.votes += 1
            choice.save()
            return Response({'status': 'vote recorded'})
        except Choice.DoesNotExist:
            return Response({'error': 'Invalid choice id'}, status=status.HTTP_400_BAD_REQUEST)

class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
