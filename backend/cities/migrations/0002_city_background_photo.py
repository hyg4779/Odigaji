# Generated by Django 4.0.3 on 2022-04-03 15:39

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='background_photo',
            field=imagekit.models.fields.ProcessedImageField(blank=True, upload_to='city_images/'),
        ),
    ]
