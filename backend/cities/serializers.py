from rest_framework import serializers
<<<<<<< HEAD
from .models import Attraction, City, Visit
=======
from models import City, Visit
>>>>>>> c9e92496d59ac5e1f20a4194d8cb428438c48227

class visit_serializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = {
            "id",
            "rate",
            "city_id",
            "user_id"
        }

        read_only_fields = ('id')
<<<<<<< HEAD


class city_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'


class attraction_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = '__all__'
=======
>>>>>>> c9e92496d59ac5e1f20a4194d8cb428438c48227
