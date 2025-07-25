from django.shortcuts import render
from rest_framework import viewsets
from .models import Category
from .serializers import CategorySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug' 
    permission_classes = [IsAuthenticated]  
  

    def get_queryset(self):
     return Category.objects.filter(parent=None)  # Only return top-level categories
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        request=self.request
        context['depth'] = request.query_params.get('depth', 1)
        return context
    
    def delete(self, request, *args, **kwargs):
     instance = self.get_object()
     if instance.children.exists():
        return Response(
            {"detail": "Cannot delete category with children."},
            status=status.HTTP_400_BAD_REQUEST
        )
     self.perform_destroy(instance) 
     return Response(
        {"message": f"Category '{instance.name}' deleted successfully."},
        status=status.HTTP_200_OK
    )