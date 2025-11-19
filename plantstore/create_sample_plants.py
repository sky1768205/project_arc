import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'plantstore.settings')
django.setup()

from plants.models import Plant

def create_sample_plants():
    plants_data = [
        {
            'name': 'Монстера Деликатесная',
            'description': 'Крупное тропическое растение с красивыми резными листьями. Идеально для просторных помещений.',
            'price': 2500.00,
            'category': 'INDOOR',
            'care_instructions': 'Полив умеренный, опрыскивание листьев, защита от прямых солнечных лучей. Подкормка раз в 2 недели.',
            'light_requirements': 'Рассеянный свет, полутень',
            'watering_needs': 'Умеренный полив 2 раза в неделю',
            'in_stock': True
        },
        {
            'name': 'Фикус Бенджамина',
            'description': 'Элегантное дерево с мелкими глянцевыми листьями. Отлично очищает воздух.',
            'price': 1800.00,
            'category': 'INDOOR',
            'care_instructions': 'Регулярный полив, яркое рассеянное освещение. Обрезка для формирования кроны.',
            'light_requirements': 'Яркий рассеянный свет',
            'watering_needs': 'Полив 1-2 раза в неделю',
            'in_stock': True
        },
        {
            'name': 'Сансевиерия (Тещин язык)',
            'description': 'Неприхотливое растение с вертикальными полосатыми листьями. Отличный выбор для начинающих.',
            'price': 890.00,
            'category': 'INDOOR',
            'care_instructions': 'Минимальный уход, переносит засуху. Подкормка раз в месяц.',
            'light_requirements': 'Любое освещение',
            'watering_needs': 'Редкий полив 1 раз в 2 недели',
            'in_stock': True
        },
        {
            'name': 'Замиокулькас (Долларовое дерево)',
            'description': 'Современное растение с глянцевыми темно-зелеными листьями. Символ богатства.',
            'price': 1200.00,
            'category': 'INDOOR',
            'care_instructions': 'Очень неприхотлив, переносит засуху и слабое освещение.',
            'light_requirements': 'Рассеянный свет, полутень',
            'watering_needs': 'Полив 1 раз в 2-3 недели',
            'in_stock': True
        },
        {
            'name': 'Спатифиллум (Женское счастье)',
            'description': 'Нежное цветущее растение с белыми покрывалами. Цветет несколько раз в год.',
            'price': 950.00,
            'category': 'FLOWERING',
            'care_instructions': 'Регулярный полив, высокая влажность. Удаление отцветших цветков.',
            'light_requirements': 'Полутень',
            'watering_needs': 'Полив 2-3 раза в неделю',
            'in_stock': True
        },
        {
            'name': 'Антуриум (Мужское счастье)',
            'description': 'Экзотическое растение с яркими красными цветами и глянцевыми листьями.',
            'price': 1500.00,
            'category': 'FLOWERING',
            'care_instructions': 'Теплолюбив, требует высокой влажности. Подкормка для цветущих растений.',
            'light_requirements': 'Яркий рассеянный свет',
            'watering_needs': 'Полив 2 раза в неделю',
            'in_stock': True
        },
        {
            'name': 'Орхидея Фаленопсис',
            'description': 'Элегантная орхидея с бабочковидными цветами. Длительный период цветения.',
            'price': 2200.00,
            'category': 'FLOWERING',
            'care_instructions': 'Специальный субстрат, полив методом погружения. Высокая влажность воздуха.',
            'light_requirements': 'Рассеянный свет',
            'watering_needs': 'Полив 1 раз в неделю',
            'in_stock': True
        },
        {
            'name': 'Герань (Пеларгония)',
            'description': 'Классическое цветущее растение с ароматными листьями. Обильное цветение.',
            'price': 650.00,
            'category': 'FLOWERING',
            'care_instructions': 'Солнечное местоположение, регулярная обрезка. Подкормка для цветения.',
            'light_requirements': 'Прямое солнце',
            'watering_needs': 'Полив по мере просыхания почвы',
            'in_stock': True
        },
        {
            'name': 'Алоэ Вера',
            'description': 'Лекарственное растение с мясистыми листьями. Обладает целебными свойствами.',
            'price': 550.00,
            'category': 'SUCCULENT',
            'care_instructions': 'Минимальный уход, хорошо дренированная почва. Легко размножается.',
            'light_requirements': 'Яркое освещение',
            'watering_needs': 'Редкий полив 1 раз в 3 недели',
            'in_stock': True
        },
        {
            'name': 'Кактус Цереус',
            'description': 'Колонновидный кактус с ребристыми стеблями. Ночное цветение.',
            'price': 750.00,
            'category': 'SUCCULENT',
            'care_instructions': 'Максимальное освещение, минимальный полив. Зимой период покоя.',
            'light_requirements': 'Прямое солнце',
            'watering_needs': 'Полив 1 раз в месяц',
            'in_stock': True
        },
        {
            'name': 'Эхеверия',
            'description': 'Декоративный суккулент с розетками мясистых листьев. Разнообразие окрасок.',
            'price': 480.00,
            'category': 'SUCCULENT',
            'care_instructions': 'Яркое освещение для сохранения окраски. Хороший дренаж обязателен.',
            'light_requirements': 'Прямое солнце',
            'watering_needs': 'Полив 1 раз в 2 недели',
            'in_stock': True
        },
        {
            'name': 'Хавортия Полосатая',
            'description': 'Миниатюрный суккулент с полосатыми листьями. Идеально для небольших пространств.',
            'price': 420.00,
            'category': 'SUCCULENT',
            'care_instructions': 'Неприхотлив, переносит слабое освещение. Легко размножается детками.',
            'light_requirements': 'Рассеянный свет',
            'watering_needs': 'Полив 1 раз в 2 недели',
            'in_stock': True
        },
        {
            'name': 'Роза садовая',
            'description': 'Классический садовый куст с ароматными цветами. Разнообразие сортов и цветов.',
            'price': 1200.00,
            'category': 'OUTDOOR',
            'care_instructions': 'Регулярная обрезка, подкормка, защита от вредителей. Укрытие на зиму.',
            'light_requirements': 'Прямое солнце',
            'watering_needs': 'Регулярный полив',
            'in_stock': True
        },
        {
            'name': 'Лаванда узколистная',
            'description': 'Ароматный многолетник с фиолетовыми соцветиями. Успокаивающий аромат.',
            'price': 680.00,
            'category': 'OUTDOOR',
            'care_instructions': 'Солнечное место, хорошо дренированная почва. Обрезка после цветения.',
            'light_requirements': 'Прямое солнце',
            'watering_needs': 'Умеренный полив',
            'in_stock': True
        },
        {
            'name': 'Гортензия крупнолистная',
            'description': 'Кустарник с крупными шаровидными соцветиями. Меняет цвет в зависимости от почвы.',
            'price': 1800.00,
            'category': 'OUTDOOR',
            'care_instructions': 'Кислая почва, регулярный полив. Укрытие на зиму в холодных регионах.',
            'light_requirements': 'Полутень',
            'watering_needs': 'Обильный полив',
            'in_stock': True
        },
        {
            'name': 'Петуния гибридная',
            'description': 'Однолетник с обильным цветением все лето. Разнообразие окрасок и форм.',
            'price': 350.00,
            'category': 'OUTDOOR',
            'care_instructions': 'Регулярное удаление увядших цветков, подкормка для цветения.',
            'light_requirements': 'Прямое солнце',
            'watering_needs': 'Регулярный полив',
            'in_stock': True
        },
        {
            'name': 'Диффенбахия',
            'description': 'Крупное растение с пестрыми листьями. Быстрорастущее, требует пространства.',
            'price': 1300.00,
            'category': 'INDOOR',
            'care_instructions': 'Яркий рассеянный свет, регулярное опрыскивание. Ядовито для животных.',
            'light_requirements': 'Рассеянный свет',
            'watering_needs': 'Полив 2 раза в неделю',
            'in_stock': True
        },
        {
            'name': 'Драцена Маргината',
            'description': 'Пальмоподобное растение с тонкими листьями с красной каймой. Очищает воздух.',
            'price': 1600.00,
            'category': 'INDOOR',
            'care_instructions': 'Умеренный полив, периодическое опрыскивание. Обрезка для ветвления.',
            'light_requirements': 'Рассеянный свет',
            'watering_needs': 'Полив 1 раз в неделю',
            'in_stock': True
        },
        {
            'name': 'Фиалка узамбарская',
            'description': 'Компактное цветущее растение с бархатистыми листьями. Длительное цветение.',
            'price': 520.00,
            'category': 'FLOWERING',
            'care_instructions': 'Полив в поддон, избегать попадания воды на листья. Яркий рассеянный свет.',
            'light_requirements': 'Яркий рассеянный свет',
            'watering_needs': 'Полив через поддон',
            'in_stock': True
        },
        {
            'name': 'Каланхоэ Блоссфельда',
            'description': 'Сукулент с яркими соцветиями. Длительное и обильное цветение.',
            'price': 620.00,
            'category': 'SUCCULENT',
            'care_instructions': 'Яркое освещение, умеренный полив. После цветения обрезка.',
            'light_requirements': 'Яркий свет',
            'watering_needs': 'Полив по мере просыхания',
            'in_stock': True
        },
        {
            'name': 'Туя западная',
            'description': 'Вечнозеленое хвойное дерево для живой изгороди. Морозоустойчива.',
            'price': 950.00,
            'category': 'OUTDOOR',
            'care_instructions': 'Регулярный полив после посадки. Формирующая обрезка.',
            'light_requirements': 'Солнце, полутень',
            'watering_needs': 'Регулярный полив',
            'in_stock': True
        },
        {
            'name': 'Бегония королевская',
            'description': 'Декоративнолиственное растение с асимметричными узорчатыми листьями.',
            'price': 780.00,
            'category': 'INDOOR',
            'care_instructions': 'Высокая влажность, защита от сквозняков. Регулярное опрыскивание.',
            'light_requirements': 'Яркий рассеянный свет',
            'watering_needs': 'Полив при подсыхании почвы',
            'in_stock': True
        },
        {
            'name': 'Юкка слоновая',
            'description': 'Древовидное растение с мечевидными листьями. Очень выносливое.',
            'price': 3200.00,
            'category': 'INDOOR',
            'care_instructions': 'Яркое освещение, редкий полив. Устойчиво к засухе.',
            'light_requirements': 'Прямое солнце',
            'watering_needs': 'Полив 1 раз в 2-3 недели',
            'in_stock': True
        },
        {
            'name': 'Папоротник Нефролепис',
            'description': 'Пышный папоротник с ажурными вайями. Любит высокую влажность.',
            'price': 1100.00,
            'category': 'INDOOR',
            'care_instructions': 'Регулярное опрыскивание, защита от прямого солнца. Деление куста при пересадке.',
            'light_requirements': 'Полутень',
            'watering_needs': 'Постоянно влажная почва',
            'in_stock': True
        }
    ]
    
    created_count = 0
    for plant_data in plants_data:
        plant, created = Plant.objects.get_or_create(
            name=plant_data['name'],
            defaults=plant_data
        )
        if created:
            created_count += 1
    
    print(f"Создано {created_count} новых растений")
    print(f"Всего растений в базе: {Plant.objects.count()}")

if __name__ == '__main__':
    create_sample_plants()