from django.db.models import Q
from rest_framework.filters import BaseFilterBackend

class ProductFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        # Filter by category
        if category_id := request.query_params.get('category'):
            queryset = queryset.filter(category_id=category_id)
            
        
            
        # Filter by price range
        if min_price := request.query_params.get('min_price'):
            queryset = queryset.filter(price__gte=min_price)
        if max_price := request.query_params.get('max_price'):
            queryset = queryset.filter(price__lte=max_price)
            
        return queryset