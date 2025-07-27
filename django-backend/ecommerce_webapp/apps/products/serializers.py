from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    children= serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent','children']
        read_only_fields = ['slug']

    
    def get_children(self, obj):
    # Get the depth limit from context (default: 1 level)
     depth_limit = int(self.context.get('depth', 2))
    
    # If we've reached maximum depth, return empty list
     if depth_limit <= 0:
        return []
    
    # Get immediate children
     immediate_children = obj.children.all() 

     if not immediate_children.exists():
        return [] 
    
    # Serialize them with reduced depth
     child_serializer = CategorySerializer(
        immediate_children,
        many=True,
        context={**self.context, 'depth': depth_limit - 1}  # Decrease depth for next level
    )
    
     return child_serializer.data



class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'category', 'stock', 'available']
        read_only_fields = ['slug']

    def validate(self, data):
     price = data.get('price')
     if price is not None and price <= 0:
        raise serializers.ValidationError({"price": "Price must be greater than zero."})
     return data

    def validate_category(self,category):
       if category.children.exists():
        raise serializers.ValidationError("Choose a leaf category.")
          
       
   
    

    
    