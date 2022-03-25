from django.urls import path
from . import views

app_name = 'cities'
urlpatterns = [
    path('', views.all_cities, name='all_cities'),
    path('<int:city_id>/get-city/', views.get_city, name='get_city'),
    path('<int:attraction_id>/get-attraction/', views.get_attraction, name='get_attraction'),
]