FROM python:3.11.8-alpine

WORKDIR /usr/src/app

COPY echo.py ./
RUN pip install websockets

ENTRYPOINT ["python", "./echo.py"]
