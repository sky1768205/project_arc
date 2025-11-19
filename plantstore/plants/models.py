from django.db import models
from django.contrib.auth.models import User

class Plant(models.Model):
    CATEGORY_CHOICES = [
        ('INDOOR', 'Комнатные растения'),
        ('OUTDOOR', 'Садовые растения'),
        ('SUCCULENT', 'Суккуленты'),
        ('FLOWERING', 'Цветущие растения'),
    ]
    
    name = models.CharField(max_length=200, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, verbose_name="Категория")
    image = models.ImageField(upload_to='plants/', verbose_name="Изображение")
    care_instructions = models.TextField(verbose_name="Инструкции по уходу")
    light_requirements = models.CharField(max_length=100, verbose_name="Требования к свету")
    watering_needs = models.CharField(max_length=100, verbose_name="Полив")
    in_stock = models.BooleanField(default=True, verbose_name="В наличии")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Растение"
        verbose_name_plural = "Растения"