from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

import numpy as np
from scipy.sparse import csr_matrix

from .models import Taste
from accounts.models import User
from cities.models import City, Visit
from .recommend import knn_recommend
# Create your views here.

@api_view(["POST"])
@permission_classes([AllowAny])
def sel_city(request):
    user = request.user
    city_id = request.data.get('city_id')
    city = get_object_or_404(City, id=city_id)

    # if not user.rate























