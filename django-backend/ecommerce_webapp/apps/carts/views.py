from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.generics import RetrieveAPIView
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from rest_framework.permissions import IsAuthenticated
from apps.products.models import Product
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users can only access their own cart
        return Cart.objects.filter(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        """Get cart without auto-creating empty cart"""
        try:
            cart = Cart.objects.get(user=request.user)
            serializer = self.get_serializer(cart)
            return Response(serializer.data)
        except Cart.DoesNotExist:
            # Return empty cart structure without creating DB record
            return Response({
                "id": None,
                "user": request.user.id,
                "items": [],
                "total_items": 0,
                "message": "Cart is empty"
            }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['delete'])
    def clear(self, request):
        """Clear cart and delete if empty"""
        try:
            cart = Cart.objects.get(user=request.user)
            cart.items.all().delete()
            
            # Delete the cart itself since it's now empty
            cart.delete()
            
            return Response(
                {"message": "Cart cleared and deleted successfully"},
                status=status.HTTP_200_OK
            )
        except Cart.DoesNotExist:
            return Response(
                {"message": "Cart is already empty"},
                status=status.HTTP_200_OK
            )

 


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            cart = Cart.objects.get(user=self.request.user)
            return CartItem.objects.filter(cart=cart)
        except Cart.DoesNotExist:
            return CartItem.objects.none()
    
    def create(self, request, *args, **kwargs):
        """Create cart only when adding items"""
        cart, created = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart, 
            product=product,
            defaults={'quantity': quantity}
        )

        if not item_created:
            cart_item.quantity += int(quantity)
            cart_item.save()
            message = 'Item quantity updated successfully'
        else:
            message = 'Item added to cart successfully'
        
        serializer = self.get_serializer(cart_item)
        return Response(
            {
                'message': message,
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED if item_created else status.HTTP_200_OK
        )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        new_quantity = request.data.get('quantity', instance.quantity)
        
        if int(new_quantity) <= 0:
            # Delete item if quantity is 0 or negative
            instance.delete()
            
            # Check if cart is now empty and delete it
            cart = instance.cart
            if not cart.items.exists():
                cart.delete()
                
            return Response(
                {'message': 'Item removed from cart (quantity was 0 or negative)'},
                status=status.HTTP_200_OK
            )
        
        instance.quantity = new_quantity
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(
            {
                'message': 'Item quantity updated successfully',
                'data': serializer.data
            },
            status=status.HTTP_200_OK
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        cart = instance.cart
        instance.delete()
        
        # Delete cart if it becomes empty
        if not cart.items.exists():
            cart.delete()
            
        return Response(
            {'message': 'Item removed from cart successfully'},
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['patch'])
    def increment(self, request, pk=None):
        """Increment quantity by 1"""
        cart_item = self.get_object()
        cart_item.quantity += 1
        cart_item.save()
        serializer = self.get_serializer(cart_item)
        return Response(
            {
                'message': 'Quantity increased by 1',
                'data': serializer.data
            },
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['patch'])
    def decrement(self, request, pk=None):
        """Decrement quantity by 1, remove if quantity becomes 0"""
        cart_item = self.get_object()
        cart = cart_item.cart
        
        if cart_item.quantity <= 1:
            cart_item.delete()
            
            # Delete cart if it becomes empty
            if not cart.items.exists():
                cart.delete()
                
            return Response(
                {'message': 'Item removed from cart (quantity reached 0)'},
                status=status.HTTP_200_OK
            )
        else:
            cart_item.quantity -= 1
            cart_item.save()
            serializer = self.get_serializer(cart_item)
            return Response(
                {
                    'message': 'Quantity decreased by 1',
                    'data': serializer.data
                },
                status=status.HTTP_200_OK
            )