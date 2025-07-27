from rest_framework.filters import BaseFilterBackend
from django.db.models import Q

class ProductFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        # Filter by category slug
        category_slug = request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        # Price range filtering
        price_min = request.query_params.get('price_min')
        price_max = request.query_params.get('price_max')
        
        if price_min:
            try:
                queryset = queryset.filter(price__gte=float(price_min))
            except ValueError:
                pass
                
        if price_max:
            try:
                queryset = queryset.filter(price__lte=float(price_max))
            except ValueError:
                pass
        
        return queryset