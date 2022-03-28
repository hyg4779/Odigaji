from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import (City, Attraction)
from .serializers import(City_list_serializer, City_serializer, Attraction_serializer)



@api_view(['GET'])
@permission_classes([AllowAny])
def all_cities(request):
    '''
    모든 여행지 정보를 받아오는 함수
    '''
    if request.method=='GET':
        cities = City.objects.all()
        serializer = City_list_serializer(cities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message': '잘못된 접근입니다.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_city(request,city_id):
    '''
    [도시 정보, [세부관광지1, 2, ...] 반환
    '''
    if request.method=='GET':
        city = get_object_or_404(City, pk=city_id)
        city_serializer = City_serializer(city)
        return Response(city_serializer.data, status=status.HTTP_200_OK)
    return Response({'message': '잘못된 접근입니다.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def get_city_photo(request, city_id):

    if request.method=='GET':
        city = get_object_or_404(City, pk=city_id)
        city_serializer = City_serializer(city)
        print("../media/logos/${1}")
        return Response(city_serializer.data, status=status.HTTP_200_OK)

    # mypage 수정
    elif request.method == 'PUT':
        city = get_object_or_404(City, pk=city_id)

        # mypage 이미지 받기
        photo = request.data.get('photo')
        print(photo)

        serializer = City_serializer(city, data=request.data)
        if serializer.is_valid(raise_exception=True):
            print('serializer is valid!')
            serializer.save(photo=photo)
            return Response(serializer.data)
        else:
            print('is not valid')
    return Response({'message': '잘못된 접근입니다.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_attraction(request,attraction_id):
    '''
    세부 관광지 정보 return 함수
    '''
    if request.method=='GET':
        attraction = get_object_or_404(Attraction, pk=attraction_id)
        attr_serializer = Attraction_serializer(attraction)
        return Response(attr_serializer.data, status=status.HTTP_200_OK)
    return Response({'message': '잘못된 접근입니다.'}, status=status.HTTP_404_NOT_FOUND)