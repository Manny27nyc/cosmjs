FROM python:3.8.18-alpine

WORKDIR /usr/src/app

COPY echo.py ./
RUN pip install websockets

ENTRYPOINT ["python", "./echo.py"]
