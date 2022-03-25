from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import (
    review_list_serializer,
    review_serializer
)
from .models import CityReview
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED
    )

@api_view(['GET'])
@permission_classes([AllowAny])
def all_reviews(request):
    '''
    전체 리뷰를 반환하는 함수
    '''
    if request.method=='GET':
        reviews = CityReview.objects.all()
        serializer = review_list_serializer(reviews, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    return Response({'message': '잘못된 접근입니다.'}, status=HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def city_reviews(request, city_id):
    '''
    GET: 관광지에 달린 리뷰를 반환
    POST: 관광지에 리뷰를 생성
    '''
    if request.method=='GET':
        reviews = CityReview.objects.filter(city=city_id)
        serializer = review_list_serializer(reviews, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    elif request.method=='POST':
        serializer = review_serializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        
    return Response({'message': '잘못된 접근입니다.'}, status=HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([AllowAny])
def user_reviews(request):
    '''
    유저가 작성한 모든 리뷰를 반환
    '''
    print(request)
    if request.method=='GET':
        reviews = CityReview.objects.filter(user=request.user.pk)
        serializer = review_list_serializer(reviews, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    return Response({'message': '잘못된 접근입니다.'}, status=HTTP_400_BAD_REQUEST)



@api_view(['GET','PUT','DELETE'])
@permission_classes([AllowAny])
def review_info(request, review_id):
    '''
    GET: 리뷰 상세정보
    PUT: 리뷰 수정
    DELETE: 리뷰 삭제
    '''
    review = get_object_or_404(CityReview, pk=review_id)
    if request.method=='GET':
        serializer = review_serializer(review)
        return Response(serializer.data, status=HTTP_200_OK)

    elif request.method=='PUT':
        if request.user.is_authenticated and review.user.id == request.user.pk:
            serializer = review_serializer(review, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=HTTP_200_OK)

    elif request.method=='DELETE':
        if request.user.is_authenticated and review.user.id == request.user.pk:
            review.delete()
            return Response({'message': '삭제되었습니다.'}, status=HTTP_200_OK)

    return Response({'message': '잘못된 접근입니다.'}, status=HTTP_400_BAD_REQUEST)
