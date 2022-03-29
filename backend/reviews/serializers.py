
from rest_framework import serializers
from .models import CityReview, Comment

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

class Comment_list_serializer(serializers.ModelSerializer):
    '''
    review에 대한 comment 목록을 반환 serializer
    '''
    class Meta:
        model = Comment
        fields = (
            "id",
            "review_id",
            "user",
            "content",
            "created",
        )
        read_only_fields = ('review_id', 'user')
