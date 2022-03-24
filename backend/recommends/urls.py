from django.urls import path
from . import views

app_name = 'recommends'
urlpatterns = [
    path('sel-city/<int:city_pk>/', views.sel_city, name='sel_city'),
]