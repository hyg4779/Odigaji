from django.urls import path
from . import views

app_name = 'reviews'
urlpatterns = [
    # 리뷰 전체목록
    path('', views.all_reviews, name='all_reviews'),

    # GET: 해당도시의 리뷰 전체 / POST: 리뷰 작성
    path('<int:city_id>/', views.city_reviews, name='city_reviews'),
    
    # 유저가 작성한 리뷰 전체
    path('user_reviews/', views.user_reviews, name='user_reviews'),
    
    # GET: 리뷰 상세내용/PUT: 리뷰수정 /DELETE: 리뷰삭제
    path('<int:review_id>/review_info/', views.review_info, name='review_info'),

    # GET: 특정 유저가 쓴 리뷰 전체 목록
    path('comment/', views.all_comment, name='all_comment'),

    # # GET: 해당 리뷰의 댓글 전체 / POST: 댓글 작성
    # path('<int:reivew_id>/', views.city_reviews, name='city_reviews'),
    
    # # 유저가 작성한 리뷰 전체
    # path('user_reviews/', views.user_reviews, name='user_reviews'),
    # # GET: 리뷰 상세내용/PUT: 리뷰수정 /DELETE: 리뷰삭제
    # path('<int:review_id>/review_info/<int:comment_id>', views.comment_info, name='review_info'),
]