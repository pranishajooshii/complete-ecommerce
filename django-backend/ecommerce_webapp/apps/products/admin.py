from django.contrib import admin

# Register your models here.
from django.contrib import admin
from mptt.admin import DraggableMPTTAdmin
from .models import Category, Product, ProductImage


# Category Admin using MPTT Tree UI
@admin.register(Category)
class CategoryAdmin(DraggableMPTTAdmin):
    mptt_indent_field = "name"
    list_display = ("tree_actions", "indented_title", "slug")
    list_display_links = ("indented_title",)
    prepopulated_fields = {"slug": ("name",)}


# Inline images in Product admin
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


# Product Admin
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "price", "available", "stock", "category")
    list_filter = ("available", "category")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductImageInline]


# ProductImage Admin (optional)
@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("product", "image", "is_main", "created_at")
    list_filter = ("is_main", "created_at")
    search_fields = ("product__name", "alt_text")
