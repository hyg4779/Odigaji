from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

# 응답 데이터로 password가 담겨오지 않도록 write only 속성으로 오버라이딩
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_active = serializers.BooleanField(default=True)
    is_admin = serializers.BooleanField(default=False)
    is_staff = serializers.BooleanField(default=False)
    photo = serializers.ImageField(use_url=True, required=False)

    class Meta: 
        model = User
        fields = ('username', 'nickname', 'password', 'photo', 'is_active', 'is_admin', 'is_staff',)

# 유저 프로필 serialier 는 이미지를 url화하여 사용
class UsermypageSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(use_url=True, required=False)
    class Meta:
        model = User
        fields = ('id', 'username', 'nickname', 'point', 'photo')

# 유저 프로필 serialier 는 이미지를 url화하여 사용
class UserpasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('password', )
