from django.urls import path
from . import views

app_name = 'recommends'
urlpatterns = [
    path('sel-city/', views.sel_city, name='sel_city'),
    path('popular/<int:n>', views.popular, name='popular'),
    path('random/', views.by_random, name='by_random'),
]