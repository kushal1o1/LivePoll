from django.db import models
from django.utils import timezone
class Poll(models.Model):
    question = models.CharField(max_length=200)
    created_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.question

class Choice(models.Model):
    poll = models.ForeignKey(Poll, related_name='choices', on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=100)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text

class Vote(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
    user_ip = models.CharField(max_length=255)
    class Meta:
        unique_together = ('poll', 'user_ip')
