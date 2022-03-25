from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import (City, Attraction)
from .serializers import(city_list_serializer, attraction_list_serializer)



@api_view(['GET'])
@permission_classes([AllowAny])
def all_cities(request):
    '''
    모든 여행지 정보를 받아오는 함수
    '''
    if request.method=='GET':
        cities = City.objects.all()
        serializer = city_list_serializer(cities, many=True)
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
        city_serializer = city_list_serializer(city)

        attractions = Attraction.objects.filter(city=city_id)
        att_serializer = attraction_list_serializer(attractions, many=True)

        data = [city_serializer.data, att_serializer.data]
        return Response(data, status=status.HTTP_200_OK)
    return Response({'message': '잘못된 접근입니다.'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
@permission_classes([AllowAny])
def get_attraction(request,attraction_id):
    '''
    세부 관광지 정보 return 함수
    '''
    if request.method=='GET':
        attraction = get_object_or_404(Attraction, pk=attraction_id)
        attr_serializer = attraction_list_serializer(attraction)
        return Response(attr_serializer.data, status=status.HTTP_200_OK)
    return Response({'message': '잘못된 접근입니다.'}, status=status.HTTP_404_NOT_FOUND)