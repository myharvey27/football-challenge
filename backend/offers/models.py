from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Offers(models.Model):
    picksA = models.CharField(max_length=255)
    picksB = models.CharField(max_length=255)
    rankingA = models.FloatField()
    rankingB = models.FloatField()
    trade_from = models.CharField(max_length=255)
    trade_to = models.CharField(max_length=255)
    calculation =  models.FloatField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="offers")

    def __str__(self):
        return self.id
