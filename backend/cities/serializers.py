from rest_framework import serializers
from .models import Attraction, City, Visit


class city_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'


class attraction_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = '__all__'


class visit_serializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = (
            "id",
            "rate",
            "city_id",
            "user_id"
        )

        read_only_fields = ('id',)