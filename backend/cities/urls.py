from django.urls import path
from . import views

app_name = 'cities'
urlpatterns = [
    path('', views.all_cities, name='all_cities'),
    path('<int:city_id>/get-city/', views.get_city, name='get_city'),
    path('<int:attraction_id>/get-attraction/', views.get_attraction, name='get_attraction'),
    path('<int:city_id>/get-city/photo/', views.get_city_photo, name='get_city_photo'),

    # input: province_id / output: {city_id, ...}
    path('<int:province_id>/roulette/', views.roulette, name='roulette')
]