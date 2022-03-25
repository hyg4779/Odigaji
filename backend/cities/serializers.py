from rest_framework import serializers
from .models import Province, Attraction, City, Visit
from django.shortcuts import get_list_or_404, get_object_or_404


class Province_serializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = '__all__'

class City_serializer(serializers.ModelSerializer):
    province_data = serializers.SerializerMethodField()
    def get_province_data(self, obj):
        province = get_object_or_404(Province, id=obj.province.id)
        serializer = Province_serializer(province)
        return serializer.data

    att_data = serializers.SerializerMethodField()
    def get_att_data(self, obj):
        atts = get_list_or_404(Attraction, city_id=obj.id)
        serializer = Attraction_serializer(atts, many=True)
        return serializer.data

    class Meta:
        model = City
        fields = (
            "id",
            "province_data",
            "name",
            "info",
            "population",
            "area",
            "photo",
            "att_data"
        )
        read_only_fields = ('id', 'name', 'info', 'population', 'area')

class City_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = (
            "id",
            "name",
            "photo",
        )

class City_visited_serializer(serializers.ModelSerializer):
    province_data = serializers.SerializerMethodField()
    def get_province_data(self, obj):
        province = get_object_or_404(Province, id=obj.province.id)
        serializer = Province_serializer(province)
        return serializer.data

    class Meta:
        model = City
        fields = (
            "id",
            "name",
            "photo",
            "province_data"
        )

class Attraction_serializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = '__all__'


class Visit_serializer(serializers.ModelSerializer):
    city_data = serializers.SerializerMethodField()
    def get_city_data(self, obj):
        city = get_object_or_404(City, id=obj.city.id)
        serializer = City_visited_serializer(city)
        return serializer.data

    class Meta:
        model = Visit
        fields = (
            "user",
            "city_data",
            "rate",
        )

class Visit_simple_serializer(serializers.ModelSerializer):
    class Meta:
        model = Visit

        read_only_fields = ('user',)