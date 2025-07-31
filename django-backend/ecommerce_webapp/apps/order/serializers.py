from .models import Order,OrderItem, ShippingAddress
from rest_framework import serializers
from apps.products.serializers import ProductDetailSerializer
from apps.products.models import Product



class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingAddress
        exclude = ['order']



# to reprsent a single item in an order
class OrderItemSerializer(serializers.ModelSerializer):
    product=ProductDetailSerializer(read_only=True, many=True)
    product_id=serializers.IntegerField(write_only=True)
    class Meta:
        model=OrderItem
        fields=['product','product_id','price','quantity']



class OrderSerializer(serializers.ModelSerializer):
    ordered_items = OrderItemSerializer(read_only=True, many=True)  
    total_items = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'user', 'created_at', 'ordered_items', 'total_items', 'total_price','status','paid']
        read_only_fields = ['id', 'created_at']

    def get_total_items(self, obj):
       
        return obj.ordered_items.count() 

    def get_total_price(self, obj):
        return sum(ordered_items.product.price * item.quantity for item in obj.ordered_items.all())



class OrderCreateSerializer(serializers.ModelSerializer):
    shipping_address=ShippingAddressSerializer()

    items=OrderItemSerializer(write_only=True, many=True)

    class Meta:
        model=Order
        fields=['paid','status','items','shipping_address']
        read_only_fields = ['id', 'paid', 'status']
    
    def create(self, validated_data):
        shipping_data = validated_data.pop('shipping_address')
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        order = Order.objects.create(user=user, **validated_data)

        # Create shipping address linked to order
        ShippingAddress.objects.create(order=order, **shipping_data)

        # Create order items (similar to before)
        for item_data in items_data:
            product_id = item_data.pop('product_id')
            product = Product.objects.get(id=product_id)
            OrderItem.objects.create(order=order, product=product, **item_data)

        return order
    
    def update(self, instance, validated_data):
    # Prevent any update if status is 'delivered'
     if instance.status == 'delivered':
        raise serializers.ValidationError("Cannot update a delivered order.")

    # Pop shipping data if present
     shipping_data = validated_data.pop('shipping_address', None)

    # Update order fields
     for attr, value in validated_data.items():
        setattr(instance, attr, value)
     instance.save()

    # Update shipping address fields
     if shipping_data:
        shipping_address = instance.shipping_address
        for attr, value in shipping_data.items():
            setattr(shipping_address, attr, value)
        shipping_address.save()

     return instance


