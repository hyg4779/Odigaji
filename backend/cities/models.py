from django.db import models
from django.conf import settings


# Create your models here.


class Province(models.Model):
    '''
    도(행정구역)
    '''
    name = models.CharField(max_length=10)


class Cities(models.Model):
    '''
    관광도시 정보
    특별시, 광역시, 자치시, 시, 군 등
    '''
    province = models.ForeignKey(Province, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    info = models.TextField
    population = models.IntegerField
    area = models.IntegerField
    photo_url = models.TextField


class Visit(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    city = models.ForeignKey(Cities, on_delete=models.CASCADE)
    rate = models.FloatField


class Attraction(models.Model):
    '''
    관광도시의 세부 관광지
    '''
    city_id = models.ForeignKey(Cities, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    address = models.CharField(max_length=30)
    facilities = models.TextField(max_length=100)
    parking_lot = models.IntegerField
    info = models.TextField
    tel = models.CharField(max_length=15)
    latitude = models.FloatField
    longitude = models.FloatField