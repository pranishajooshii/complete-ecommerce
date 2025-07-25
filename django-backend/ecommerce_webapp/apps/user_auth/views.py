from django.shortcuts import render
from rest_framework import viewsets
from .models import CustomUser
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.permissions import AllowAny

from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.
class RegisterViewSet(viewsets.ModelViewSet):
    
    serializer_class = RegisterSerializer
    queryset = User.objects.all()
    http_method_names = ['post']
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
     serializer = self.get_serializer(data=request.data)
     serializer.is_valid(raise_exception=True)
     user = serializer.save()
    
     token, _ = Token.objects.get_or_create(user=user)  # Only here

     response_data = {
        'user': {
            'email': user.email,
            'fullname': user.fullname,
        },
        'token': token.key,
        'message': 'User registered successfully'
    }

     return Response(response_data, status=status.HTTP_201_CREATED)


class LoginViewSet(viewsets.ViewSet):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        # Delete existing token if it exists
        Token.objects.filter(user=user).delete()

        token, _ = Token.objects.get_or_create(user=user)

        response_data = {
            'user': {
                'email': user.email,
                'fullname': user.fullname,
            },
            'token': token.key,
            'message': 'Login successful'
        }

        return Response(response_data, status=status.HTTP_200_OK)