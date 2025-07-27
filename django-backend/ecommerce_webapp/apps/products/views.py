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
from rest_framework.decorators import action

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug' 
    permission_classes = [IsAuthenticatedOrReadOnly] 
    filter_backends = [ProductFilterBackend, ProductSearchFilter]  


    
    
    def get_queryset(self):
      queryset = Category.objects.all().select_related('parent')  # Optimize parent fetching
    
   
      if self.action == 'list':
        queryset = queryset.filter(parent=None)  
    
      return queryset

    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        request=self.request
        context['depth'] = request.query_params.get('depth', 1)
        return context
    
    def destroy(self, request, *args, **kwargs):
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

    @action(detail=True, methods=['get'], url_path='get_products')
    def get_products(self, request, slug=None):
     category = self.get_object()
     print(f"Slug received: {slug}")
     print(f"Category: {category}")

     descendants = category.get_descendants(include_self=True)  # fix typo here
     products = Product.objects.filter(category__in=descendants)

     if products.exists():
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
     else:
        return Response({"detail": "No products found"}, status=status.HTTP_404_NOT_FOUND)
 





class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'  
    filter_backends = [ProductFilterBackend, ProductSearchFilter]  
    
    def get_queryset(self):
        return Product.objects.filter(available=True).select_related('category')
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if not queryset.exists():
            return Response(
                {"detail": "No products found for the given category."},
                status=status.HTTP_404_NOT_FOUND
            )
    

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
  