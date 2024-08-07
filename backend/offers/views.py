from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, OfferSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Offers

# basic user view, generics 
class CreateUserView(generics.CreateAPIView):
    # makes sure we aren't creating a user that already exists
    queryset = User.objects.all()
    # tells us what we need to make a new user
    serializer_class = UserSerializer
    # allows anyone to use this view to make a user
    permission_classes = [AllowAny]

class OfferListCreate(generics.ListCreateAPIView):
    serializer_class = OfferSerializer
    # can only follow this route if user is authenticated with jwt
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Offers.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else: print(serializer.errors)

class OfferDelete(generics.DestroyAPIView):
    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Offers.objects.filter(author=user)

    
