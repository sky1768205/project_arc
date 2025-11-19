from django.urls import path
from . import views

urlpatterns = [
    path('plants/', views.PlantListView.as_view(), name='plant-list'),
    path('plants/<int:pk>/', views.PlantDetailView.as_view(), name='plant-detail'),
    path('plants/create/', views.PlantCreateView.as_view(), name='plant-create'),
    path('categories/', views.plant_categories, name='plant-categories'),
]