from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import Poll, Choice ,Vote
from .serializers import PollSerializer, ChoiceSerializer


class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        poll = self.get_object()
        choice_id = request.data.get('choice_id')
        user_ip = request.META.get('REMOTE_ADDR')

        if Vote.objects.filter(poll=poll, user_ip=user_ip).exists():
            return Response({'error': 'You have already voted for this poll.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            choice = poll.choices.get(id=choice_id)
            choice.votes += 1
            choice.save()

            # Record the vote
            Vote.objects.create(poll=poll, choice=choice, user_ip=user_ip)

            return Response({'status': 'vote recorded'})
        except Choice.DoesNotExist:
            return Response({'error': 'Invalid choice id'}, status=status.HTTP_400_BAD_REQUEST)



class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
