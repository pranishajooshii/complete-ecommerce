from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, OrderItemViewSet, ShippingAddressViewSet

router = DefaultRouter()
router.register(r'order', OrderViewSet, basename='order')
router.register(r'order-items', OrderItemViewSet, basename='orderitem')
router.register(r'shipping-address', ShippingAddressViewSet, basename='shipping')


urlpatterns = [
    path('', include(router.urls)),
]