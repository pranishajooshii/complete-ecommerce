from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q, Sum, Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from .models import Order, OrderItem, ShippingAddress
from .serializers import (
    OrderSerializer, 
    OrderCreateSerializer, 
    OrderUpdateSerializer,
    OrderItemSerializer,
    ShippingAddressSerializer
)


class OrderViewSet(viewsets.ModelViewSet):
   
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ['status', 'paid']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    search_fields = ['status', 'id']

    def get_queryset(self):
       
        return Order.objects.filter(user=self.request.user).prefetch_related(
            'ordered_items__product',
            'shipping_address'
        ).select_related('user')

    def get_serializer_class(self):
       
        if self.action == 'create':
            return OrderCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return OrderUpdateSerializer
        return OrderSerializer

    def perform_create(self, serializer):
    
        serializer.save()

    def create(self, request, *args, **kwargs):
      
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        
        # Returning detailed order information
        response_serializer = OrderSerializer(order)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        """Update order with validation."""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        #  validation for status changes
        if 'status' in request.data:
            new_status = request.data['status']
            if instance.status == 'cancelled' and new_status != 'cancelled':
                return Response(
                    {'error': 'Cannot change status of cancelled order.'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        order = serializer.save()
        response_serializer = OrderSerializer(order)
        return Response(response_serializer.data)

  

    @action(detail=True, methods=['post'])
    def cancel_order(self, request, pk=None):
       
        order = self.get_object()
        if order.status in ['pending', 'processing']:
            order.status = 'cancelled'
            order.save()
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        else:
            return Response(
                {'error': 'Order cannot be cancelled at this stage.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    
        
       

    @action(detail=False, methods=['get'])
    def my_orders(self, request):
        """Get all orders for the current user with filtering options."""
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = OrderSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)

    
    @action(detail=True, methods=['put'])
    def update_shipping_address(self, request, pk=None):
        """Update shipping address for an order."""
        order = self.get_object()
        
        # Only allow updates for pending or processing orders
        if order.status not in ['pending', 'processing']:
            return Response(
                {'error': 'Cannot update shipping address for orders in this status.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            shipping_address = order.shipping_address
            serializer = ShippingAddressSerializer(shipping_address, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ShippingAddress.DoesNotExist:
            return Response(
                {'error': 'Shipping address not found for this order.'}, 
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['get'])
    def recent_orders(self, request):
        """Get recent orders (last 30 days)."""
        from datetime import datetime, timedelta
        thirty_days_ago = datetime.now() - timedelta(days=30)
        
        queryset = self.get_queryset().filter(created_at__gte=thirty_days_ago)
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)


class OrderItemViewSet(viewsets.ModelViewSet):
    
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['order__status', 'product']
    ordering_fields = ['price', 'quantity']
    ordering = ['id']

    def get_queryset(self):
     
        return OrderItem.objects.filter(
            order__user=self.request.user
        ).select_related('order', 'product')

    def perform_create(self, serializer):
   
        order = serializer.validated_data['order']
        if order.user != self.request.user:
            return Response(
                {'error': "You don't have permission to add items to this order."}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if order allows modifications
        if order.status in ['shipped', 'delivered', 'cancelled']:
            return Response(
                {'error': 'Cannot add items to orders in this status.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer.save()

    def perform_update(self, serializer):
        """Validate that the order item can be updated."""
        order_item = self.get_object()
        if order_item.order.status in ['shipped', 'delivered', 'cancelled']:
            return Response(
                {'error': 'Cannot modify items for orders in this status.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save()

    def perform_destroy(self, instance):
        """Validate that the order item can be deleted."""
        if instance.order.status in ['shipped', 'delivered', 'cancelled']:
            return Response(
                {'error': 'Cannot delete items for orders in this status.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        instance.delete()

    @action(detail=True, methods=['patch'])
    def update_quantity(self, request, pk=None):
        """Update the quantity of an order item."""
        order_item = self.get_object()
        quantity = request.data.get('quantity')
        
        if not quantity or not isinstance(quantity, int) or quantity <= 0:
            return Response(
                {'error': 'Quantity must be a positive integer.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if order_item.order.status in ['shipped', 'delivered', 'cancelled']:
            return Response(
                {'error': 'Cannot modify items for orders in this status.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order_item.quantity = quantity
        order_item.save()
        serializer = self.get_serializer(order_item)
        return Response(serializer.data)

  

    @action(detail=True, methods=['get'])
    def calculate_total(self, request, pk=None):
        """Calculate total price for this order item."""
        order_item = self.get_object()
        total = order_item.price * order_item.quantity
        return Response({'total_price': total})


class ShippingAddressViewSet(viewsets.ModelViewSet):
    
    serializer_class = ShippingAddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
       
        return ShippingAddress.objects.filter(
            order__user=self.request.user
        ).select_related('order')

    def perform_create(self, serializer):
       
        order = serializer.validated_data['order']
        if order.user != self.request.user:
            return Response(
                {'error': "You don't have permission to create shipping address for this order."}, 
                status=status.HTTP_403_FORBIDDEN
            )
        serializer.save()

    def perform_update(self, serializer):
       
        shipping_address = self.get_object()
        if shipping_address.order.status in ['shipped', 'delivered', 'cancelled']:
            return Response(
                {'error': 'Cannot modify shipping address for orders in this status.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save()