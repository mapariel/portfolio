#!/bin/sh
python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate
exec gunicorn portfolio.wsgi:application --bind 0.0.0.0:$PORT --log-file -
