from django.shortcuts import render
from rest_framework import viewsets
from .models import Category,Product, ProductImage
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.permissions import  IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from django.utils.text import slugify
from .filters import ProductFilterBackend
from .search import ProductSearchFilter

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug' 
    permission_classes = [IsAuthenticatedOrReadOnly]  
  

    
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




class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'  
    filter_backends = [ProductFilterBackend, ProductSearchFilter]  
    
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if not queryset.exists():
            return Response(
                {"detail": "No products found for the given category."},
                status=status.HTTP_404_NOT_FOUND
            )
    

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
  