from rest_framework import serializers
from .models import Cart, CartItem
from apps.products.serializers import ProductSerializer
from apps.products.models import Product


class CartItemSerializer(serializers.ModelSerializer):
    product=ProductSerializer(read_only=True)
    product_id=serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )
    class Meta:
        model=CartItem
        fields=['product','quantity','id','created_at','product_id']
        read_only_fields=['id','created_at']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True, many=True)  
    total_items = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'items', 'total_items', 'total_price']
        read_only_fields = ['id', 'created_at']

    def get_total_items(self, obj):
       
        return obj.items.count()  # Counts only THIS cart's items

    def get_total_price(self, obj):
        return sum(item.product.price * item.quantity for item in obj.items.all())

    