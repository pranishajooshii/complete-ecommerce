from django.contrib import admin
from .models import Cart, CartItem

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'created_at')
    list_display_links = ('id', 'user')
    list_filter = ('created_at',)
    search_fields = ('user__fullname', 'user__email')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product', 'quantity', 'created_at')
    list_display_links = ('id', 'cart')
    list_filter = ('created_at', 'product')
    search_fields = ('cart__user__fullname', 'product__name')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)