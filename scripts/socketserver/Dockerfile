FROM python:3.12.0a5-alpine

WORKDIR /usr/src/app

COPY echo.py ./
RUN pip install websockets

ENTRYPOINT ["python", "./echo.py"]
