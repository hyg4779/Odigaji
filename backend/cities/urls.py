from django.urls import path
from . import views

app_name = 'cities'
urlpatterns = [
    # 모든 도시 반환
    path('', views.all_cities, name='all_cities'),

    # 도시 정보 반환
    path('<int:city_id>/get-city/', views.get_city, name='get_city'),

    # 세부관광지 정보 반환
    path('<int:attraction_id>/get-attraction/', views.get_attraction, name='get_attraction'),

    # 도시 사진 추출(개발용 api)
    path('<int:city_id>/get-city/photo/', views.get_city_photo, name='get_city_photo'),
    
    # input: province_id / output: {city_id, ...}
    path('<int:province_id>/roulette/', views.roulette, name='roulette')
]