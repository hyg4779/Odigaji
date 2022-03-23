# Generated by Django 4.0.3 on 2022-03-23 09:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Taste',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('seasons', models.IntegerField(choices=[(1, '봄'), (2, '여름'), (3, '가을'), (4, '겨울')])),
                ('mnt_sea', models.IntegerField(choices=[(5, '산'), (6, '바다')])),
                ('urb_rur', models.IntegerField(choices=[(7, '도시'), (8, '시골')])),
                ('comp', models.IntegerField(choices=[(9, '혼자'), (10, '친구'), (11, '연인'), (12, '가족')])),
                ('impo', models.IntegerField(choices=[(13, '풍경'), (14, '음식'), (15, '액티비티'), (16, '힐링')])),
                ('paint', models.IntegerField(choices=[(17, '별이 빛나는 밤'), (18, '그랑드자트섬의 일요일 오후'), (19, '메모리 지속성의 붕괴'), (20, '민중을 이끄는 자유의 여신')])),
                ('movie', models.IntegerField(choices=[(21, '기생충'), (22, '토이스토리'), (23, '인터스텔라'), (24, '건축학개론'), (25, '분노의 질주'), (26, '극한직업')])),
                ('trans', models.IntegerField(choices=[(27, '자가용'), (28, '대중교통'), (29, '도보')])),
                ('plan', models.IntegerField(choices=[(30, '계획적'), (31, '즉흥적')])),
                ('mor_eve', models.IntegerField(choices=[(32, '아침형 인간'), (33, '저녁형 인간')])),
            ],
        ),
    ]
