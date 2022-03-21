from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

# 응답 데이터로 password가 담겨오지 않도록 write only 속성으로 오버라이딩
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta: 
        model = User
        fields = ('email', 'nickname', 'password')

# 유저 프로필 serialier 는 이미지를 url화하여 사용
class UserProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(use_url=True, required=False)
    background_image = serializers.ImageField(use_url=True, required=False)
    class Meta:
        model = User
        fields = ('id', 'email', 'nickname', 'point', 'photo')
