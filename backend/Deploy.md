### BACK

- Dockerfile

  ```
  FROM python:3.9.6
  ENV PYTHONDONTWRITEBYTECODE=1
  ENV PYTHONUNBUFFERED=1
  WORKDIR /code
  COPY requirements.txt /code/
  RUN pip install -r requirements.txt
  COPY . /code/
  EXPOSE 8000
  
  CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
  ```

- 빌드 명령어

  ```shell
  docker build --platform linux/amd64 -t junh9547/django_tmp .
  ```



