
from rest_framework import serializers
from .models import CityReview

class Review_list_serializer(serializers.ModelSerializer):
    '''
    review들 읽어서 반환하는 serializer
    '''
    class Meta:
        model = CityReview
        fields = (
            "id",
            "title",
            "user",
            "city",
            "updated",
        )
        read_only_fields = ('user', )

class Review_serializer(serializers.ModelSerializer):
    '''
    review 생성하는 serializer
    '''
    class Meta:
        model = CityReview
        fields = '__all__'
        read_only_fields = ('user', )