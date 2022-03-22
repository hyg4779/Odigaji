import csv
import pymysql

# csv 파일 읽어들임
f = open('여행지 데이터.csv','r',encoding='utf-8')
rdr = csv.reader(f)

# db와 python 연결
# conn=pymysql.connect(host='3.38.250.117', port=3333, user='root', password='ssafy103', db='db이름', charset='utf-8')
# curs = conn.cursor()
# conn.commit()

# City 테이블에 각 컬럼을 지정해 넣는 sql문
# sql = "INSERT into City (city_id, name, introduce, population, area, photo) values (%d, %s, %s, %d, %f, %s)"

for line in rdr:
    # 각 줄에서 변수 할당
    city_id = line[0]
    name = line[1].lstrip('')
    introduce = line[2]
    population = line[3]
    area = line[4]
    photo = line[5]
    print(line)
    # 알맞은 변수에 매핑하여 sql문 실행
    # curs.execute(sql, (city_id, name, introduce, population, area, photo))

f.close()

# id, 도시명, 소개, 인구수(명), 면적(km^2), 사진url