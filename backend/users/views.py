from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from django.contrib.auth import get_user_model
from .serializers import UserRegisterSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication

    def get(self, request):
        serializer = UserRegisterSerializer(request.user)  # serialize the current user
        return Response(serializer.data)