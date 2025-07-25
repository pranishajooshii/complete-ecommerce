from django.db.models import Q
from rest_framework.filters import SearchFilter

class ProductSearchFilter(SearchFilter):
    search_param = 'q'  
    
    def get_search_terms(self, request):
        """Extract search terms from URL"""
        return [request.query_params.get(self.search_param, '')]
    
    def filter_queryset(self, request, queryset, view):
        """Custom search across multiple fields"""
        terms = self.get_search_terms(request)
        if not terms or not terms[0]:
            return queryset
            
        search_term = terms[0]
        return queryset.filter(
            Q(name__icontains=search_term) |
            Q(description__icontains=search_term) |
            Q(category__name__icontains=search_term)
        )