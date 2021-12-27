#!/bin/sh

exec gunicorn portfolio.wsgi:application --bind 0.0.0.0:$PORT --log-file -
