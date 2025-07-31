from .models import Order, OrderItem, ShippingAddress
from rest_framework import serializers
from apps.products.serializers import ProductDetailSerializer
from apps.products.models import Product

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        exclude = ['order']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductDetailSerializer(read_only=True)  
    product_id = serializers.IntegerField(write_only=True)
    total_price = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)  

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'price', 'quantity', 'total_price']  
    
    def get_total_price(self, obj):
        return obj.price * obj.quantity
    
    def validate_product_id(self, value):
        try:
            Product.objects.get(id=value)
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product does not exist.")
        return value

class OrderSerializer(serializers.ModelSerializer):
    ordered_items = OrderItemSerializer(many=True, read_only=True)  
    total_amount = serializers.SerializerMethodField()
    items_count = serializers.SerializerMethodField()
    user = serializers.StringRelatedField(read_only=True)
    shipping_address = ShippingAddressSerializer(read_only=True)  

    class Meta:
        model = Order
        fields = [
            'id', 'ordered_items', 'total_amount', 'items_count', 
            'user', 'created_at', 'updated_at', 'status', 'paid',
            'shipping_address'
        ]  
        read_only_fields = ['created_at', 'updated_at']

    def get_total_amount(self, obj):
        return sum(item.price * item.quantity for item in obj.ordered_items.all())

    def get_items_count(self, obj):
        return obj.ordered_items.count()

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, write_only=True)
    shipping_address = ShippingAddressSerializer()

    class Meta:
        model = Order
        fields = ['shipping_address', 'status', 'paid', 'items']
        

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        shipping_data = validated_data.pop('shipping_address')
        user = self.context['request'].user

        order = Order.objects.create(user=user, **validated_data)
        ShippingAddress.objects.create(order=order, **shipping_data)
        
        for item_data in items_data:
            product_id = item_data.pop('product_id') 
            product = Product.objects.get(id=product_id) 
            OrderItem.objects.create(
                order=order,
                product=product,
                price=product.price,  # Snapshot the current price
                **item_data
            )
        
        return order

class OrderUpdateSerializer(serializers.ModelSerializer):
    shipping_address = ShippingAddressSerializer(required=False)

    class Meta:
        model = Order
        fields = ['status', 'paid', 'shipping_address']
    
    def validate(self, data):
        if self.instance.status == 'delivered' and 'status' in data and data['status'] != 'delivered':
            raise serializers.ValidationError("Cannot change status of delivered order.")
        return data

    def update(self, instance, validated_data):
        shipping_data = validated_data.pop('shipping_address', None)
        
        # Update order fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update shipping address if provided
        if shipping_data:
            shipping = instance.shipping_address
            for attr, value in shipping_data.items():
                setattr(shipping, attr, value)
            shipping.save()
        
        return instance