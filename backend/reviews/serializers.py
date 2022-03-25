from attr import field
from rest_framework import serializers
from .models import CityReview

class review_list_serializer(serializers.ModelSerializer):
    '''
    review들 읽어서 반환하는 serializer
    '''
    class Meta:
        model = CityReview
        fields = '__all__'
        read_only_fields = ('user', )

class review_serializer(serializers.ModelSerializer):
    '''
    review 생성하는 serializer
    '''
    class Meta:
        model = CityReview
        fields = '__all__'
        read_only_fields = ('user', )