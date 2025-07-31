from django.db import models
from django.contrib.auth import get_user_model
from apps.products.models import Product


User = get_user_model()

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    paid = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled')
    ], default='pending')

    class Meta:
        ordering = ('-created_at',)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='ordered_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='shipping_address')
    shipping_address = models.CharField(max_length=255, blank=False, null=False)
    shipping_district = models.CharField(max_length=100, blank=False, null=False)
    shipping_city = models.CharField(max_length=100,blank=False, null=False)
    recipient_name = models.CharField(max_length=100, blank=False, null=False)
    recipient_phone_number = models.CharField(max_length=20,blank=True, null=True )
    shipping_landmark = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Shipping Address for Order #{self.order.id}" 
   
    
