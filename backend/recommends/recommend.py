import numpy as np
from django.shortcuts import get_list_or_404, get_object_or_404
from scipy.sparse import csr_matrix
import random

from recommends.models import Taste
from accounts.models import User
from cities.models import City, Visit
from cities.serializers import Visit_simple_serializer
from apscheduler.schedulers.background import BackgroundScheduler

def knn_recommend(user_id):
    '''
    추천 함수, url과 연결되지 않은 그냥 함수임.
    '''
    K = 5   # 비슷한 유저 5명 활용(이후에 K를 인자로 받는 방식으로 변경 가능)
    row_of_request_user = get_object_or_404(Taste, user_id=user_id).id
    user_num = Taste.objects.last().id+1
    city_num = City.objects.last().id+1

    # 전체 visit, taste 데이터를 가져와 csr matrix를 만들것
    # visit은 유사한 유저 찾기, 추천에 다 사용할 것이고, taste는 유사한 유저 찾기에만 사용

    # csr_mat작성 필요한 row, col, data 준비
    spr_u = []      #row - User
    spr_c = []      #col - City
    spr_r = []      #data - Rate

    # visit 테이블 데이터를 가져와 위의 리스트 삼대장을 채움
    visits = Visit.objects.all()
    for visit in visits:
        # 한 visit 데이터의 유저가 취향데이터도 있으면
        if Taste.objects.filter(user_id=visit.user_id).exists():
            # user의 행은 userid로 찾은 taste의 Id
            user_row_in_taste = Taste.objects.get(user_id=visit.user_id).id
            spr_u.append(user_row_in_taste)
            spr_c.append(visit.city_id)
            spr_r.append(visit.rate)

    # 추천에는 visit만 필요함으로 추천용 csr_matrix를 미리 만들어둔다.
    user_city_mat = csr_matrix((spr_r, (spr_u, spr_c)), shape=(user_num, city_num))

    # knn에 사용할 csr_mat를 위해 taste 테이블 데이터를 가져와 삼대장을 계속 채움
    tastes = Taste.objects.all()
    for taste in tastes:
        # 한 컬럼에 들어갈 10개의 값 다 row는 같은 유저이기 때문에 row에 유저 id 10개
        u_id = taste.id
        spr_u.extend([u_id]*10)
        # 들어갈 컬럼은 취향에 따라 위치가 달라지기 때문에 하나하나 작성, 도시 데이터 뒤에 붙기위해 city_num을 붙이고,
        # db에 저장된 taste의 값은 1부터 시작하는 값임. 값 정보는 Taste모델 참조
        tastes_c = [
            city_num+taste.seasons,
            city_num+taste.mnt_sea,
            city_num+taste.urb_rur,
            city_num+taste.comp,
            city_num+taste.impo,
            city_num+taste.paint,
            city_num+taste.movie,
            city_num+taste.trans,
            city_num+taste.plan,
            city_num+taste.mor_eve,
        ]
        spr_c.extend(tastes_c)
        # 각 취향마다 할당한 점수. 얼마의 점수를 할당해야 유의미할지는 모르겠지만 일단 다 5로 줬음.
        taste_points = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        spr_r.extend(taste_points)

    # 삼대장을 활용해서 mat를 만듦. shape에 col은 전체 도시수 + 취향의 총 컬럼 수인 33
    mat = csr_matrix((spr_r, (spr_u, spr_c)), shape=(user_num, city_num+34))
    # 코사인 유사도를 활용해서 유저간 유사도를 나타내는 UbyU dense 행렬을 만든다.
    UbyU = (mat*mat.transpose()).toarray()
    # 자기 자신과의 유사도를 0으로 고정.
    UbyU[range(user_num), range(user_num)] = 0
    # 여기까지가 visit과 taste를 knn알고리즘을 통해 유저별 유사도와 유사한 K명의 유저를 구하는 단계
    topK = UbyU.argsort(axis=1)[:,-K:]
    # 유저-도시의 예상 선호도(추천결과)를 저장할 배열
    predicted_mat = np.zeros((user_num, city_num))

    for i in range(user_num):
        # 유저 i와, 그와 K번째로 유사한 유저의 유사도 weight
        weights = UbyU[i, topK[i]]
        # 유저 i의 행에 있는 모든 컬럼(지역)에 유저 j의 가중치 * 유저 j가 해당 지역에 준 평점을 곱해줌
        for j in range(K):
            user_city_mat[i] += weights[j] * user_city_mat[topK[i, j]]

        user_city_mat[i] = user_city_mat[i] / weights.sum()

    print(user_city_mat.toarray()[row_of_request_user])
    return user_city_mat[row_of_request_user]

def popular_cities(n):
    '''
    n개의 인기 도시 반환
    '''
    visits = get_list_or_404(Visit)
    ranks = {}

    for visit in visits:
        city_id = visit.city_id
        rate = visit.rate
        ranks[city_id] = ranks.get(city_id, 0) + rate
    return sorted(ranks.items(), key= lambda x: -x[1])

def random_city():
    cities = get_list_or_404(City)
    rand_id = random.randrange(0, len(cities))
    return cities[rand_id]