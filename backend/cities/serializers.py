from rest_framework import serializers
from models import City, Visit

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
