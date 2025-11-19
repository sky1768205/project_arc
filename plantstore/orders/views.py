from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, Order
from .serializers import CartSerializer, CartItemSerializer, AddToCartSerializer, UpdateCartItemSerializer
from plants.models import Plant

class CartDetailView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

@api_view(['POST'])
def add_to_cart(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Требуется авторизация'}, status=status.HTTP_401_UNAUTHORIZED)
    
    serializer = AddToCartSerializer(data=request.data)
    if serializer.is_valid():
        plant_id = serializer.validated_data['plant_id']
        quantity = serializer.validated_data['quantity']
        
        plant = get_object_or_404(Plant, id=plant_id)
        
        if not plant.in_stock:
            return Response({'error': 'Товар отсутствует в наличии'}, status=status.HTTP_400_BAD_REQUEST)
        
        cart, created = Cart.objects.get_or_create(user=request.user)
        
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            plant=plant,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        
        cart_serializer = CartSerializer(cart)
        return Response({
            'message': f'Растение "{plant.name}" добавлено в корзину',
            'cart': cart_serializer.data
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_cart_item(request, item_id):
    if not request.user.is_authenticated:
        return Response({'error': 'Требуется авторизация'}, status=status.HTTP_401_UNAUTHORIZED)
    
    cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    
    serializer = UpdateCartItemSerializer(data=request.data)
    if serializer.is_valid():
        quantity = serializer.validated_data['quantity']
        cart_item.quantity = quantity
        cart_item.save()
        
        cart_serializer = CartSerializer(cart_item.cart)
        return Response({
            'message': 'Количество обновлено',
            'cart': cart_serializer.data
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def remove_from_cart(request, item_id):
    if not request.user.is_authenticated:
        return Response({'error': 'Требуется авторизация'}, status=status.HTTP_401_UNAUTHORIZED)
    
    cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    plant_name = cart_item.plant.name
    cart_item.delete()
    
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart_serializer = CartSerializer(cart)
    
    return Response({
        'message': f'Растение "{plant_name}" удалено из корзины',
        'cart': cart_serializer.data
    })

@api_view(['DELETE'])
def clear_cart(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Требуется авторизация'}, status=status.HTTP_401_UNAUTHORIZED)
    
    cart = get_object_or_404(Cart, user=request.user)
    items_count = cart.items.count()
    cart.items.all().delete()
    
    cart_serializer = CartSerializer(cart)
    return Response({
        'message': f'Корзина очищена. Удалено {items_count} товаров',
        'cart': cart_serializer.data
    })