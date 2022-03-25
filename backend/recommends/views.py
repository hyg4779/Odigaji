from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

import numpy as np
from scipy.sparse import csr_matrix

from .models import Taste
from accounts.models import User
from cities.models import City, Visit

from cities.serializers import visit_serializer

from .recommend import knn_recommend
# Create your views here.

# @api_view(["POST"])
# @permission_classes([AllowAny])
# def sel_city(request):
#     user = request.user
#     city_id = request.data.get('city_id')
#     city = get_object_or_404(City, id=city_id)
#     if not user.rate_cities.filter(pk=city.id).exists():
#         serializer = visit_serializer(data=request.data)
#     else:
#         visit = get_object_or_404(Visit, user_id=user.id, city_id=city_id)
#         if not request.data.get('rate'):
#             visit.delete()
#             return Response(status=status.HTTP_205_RESET_CONTENT)
#         serializer = visit_serializer(instance=visit, data=request.data)
#
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(user=request.user)
#         return Response(status=status.HTTP_201_CREATED)
#     return Response(status=status.HTTP_400_BAD_REQUEST)























