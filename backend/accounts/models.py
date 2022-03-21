from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill


class User(AbstractUser):
    nickname = models.CharField(max_length=100, default='')
    
    photo = ProcessedImageField(
        blank=True,
        upload_to='profile_images/%Y/%m/%d/',
        processors=[ResizeToFill(200,200)],
        format='JPEG',
        options={'quality':100 }
    )
    # 유저의 리뷰 및 댓글에 따른 점수 필드
    point = models.BigIntegerField(default=0)
