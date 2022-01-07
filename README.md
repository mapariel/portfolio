# Build a portfolio app with Django, React and Docker

This project is largely inspired by the excellent series of article from Pixies : https://aiki.dev/series/pixies-build-an-app-with-django-react-and-docker/. The author explains very clearly there, in a series of 12 articles, how to proceed. There are many articles about the topic on internet, and I am already a bit familiar with those technologies, but I learned a lot by reading this.

There are some differences with the source articles :
* Backend (with Django) and frontend (with React) do different things, but this is a detail, if you use this, you will probably make your own.
* I don't use Heroku for the deploymnent, instead I have access to a server with docker for it (actually a Sybology NAS)
* In my backend, I use the field [ImageField](https://docs.djangoproject.com/en/4.0/ref/models/fields/#imagefield),   and using Medias with Django in production and in Deployment are two different things, I had to come up with a solution for production. For the static files (css), the solution from [Pixies](https://aiki.dev/posts/serving-static-files/) with [whitenoise](http://whitenoise.evans.io/en/stable/) was super easy to implement.

## Principles

In production we have three containers running, the backend (for Django), the frontend (with the javascript build from react and webpack, and the images uploaded) and a last container for the database Postrgres.


## How to deal with image fields

First when you put image fields, you need to install the python library Pillow. For some reason, it didn't seem to work fine in the backend-container. I added those lines in the **Dockerfile** in the backend to build Pillow package from the source in the alpine-based image. 

```
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql \
    && apk add postgresql-dev \
    && pip install psycopg2 \
    && apk add jpeg-dev zlib-dev libjpeg \
    && pip install Pillow \
    && apk del build-deps
```


The images uploaded from the Django backend are stored in a volume, this volume is also shared by the frontend container, below the changes in **docker-compose.yml**

```
  backend:
    build: .
	[...]
    volumes:  
      - mediafiles:/mediafiles  
    [...]          
  frontend:
    build:
      context: ../frontend
    [...]          
    volumes:
      - mediafiles:/usr/share/nginx/mediafiles            
	[...]

volumes:
  data:
  mediafiles:

```

Finally the frontend container contains a server NGINX to serve the content pages (HTML and JS) .Actually it is one page, as it is a Single App Page application created with react. The page is accessible at a base url (http://mapariel.dd-dns.de). The request to API pages and images are also send to the same NGINX server. For API, it will take care of sending them to the backend server. Here are the lines of the NGINX configuration file which are taking care of that (in **frontend/default.conf**). In addition, the **Dockerfile** of the frontend must replace the initial default.conf by the modified version.
```
    location /media/ {
        alias   /usr/share/nginx/mediafiles/;
    }

		location /api/ {
        proxy_pass http://backend:80;
    }

```

## Instructions



### Launch the full-stack

Now you can try the full-stack application with the docker-compose.yml file. There will be three containers : one for postgresql, one for the backend and one for the frontend,

`docker-compose up --build --detach`

The application should be available at http://localhost:9091/


Once the containers are launched, there is the need to initialize the database from the backend container. You just have to do it one time.  

First enter inside the container :

`docker exec -it portfolio_backend_1 sh`

And then migrate and create the super user.

```
python manage.py migrate

python manage.py createsuperuser
```

Then `exit` to leave the container.

Finaly you need to put your projects to the database, go to http://localhost:9090/admin , connect with the superuser infos you have just created, and add one or several projects.








### Launch the database container and work on the backend

During the development phase, we will use Django and Postgresql as a database. We are not going to install Postrgresql on the host, but, instead, will run it through a container.

`docker-compose --f db.yml up --detach`

Then go to the backend folder and install python in a virtual environment. Install also the modules from requirements.txt

```
$ python3 -m venv .venv
$ source .venv/bin/activate
(.venv) $ pip install -r requirements.txt
```

 The first time, you should use  `python manage.py migrate` and `python manage.py createsuperuser`. You don't need do do it if you have alreacy done it from the container.


Launch Django `python manage.py runserver` you can access to Djabgo application at  http://127.0.0.1:8000/ and to the admin at http://127.0.0.1:8000/admin

Note that some variables are store in the `.env` file in the backend folder. There should not be any need to change them...

If you have to install new Python modules, you have to run `pip freeze > requirements.txt` after, so that those modules are also installed in the Docker container.


Please refer directly to https://aiki.dev/posts/lean-django/ and https://aiki.dev/posts/django-apps/ for more information about virtual environments, Django and Django applications.

### Work on the frontend

Now the backend is ready, we are going to launch it with docker-compose. There will be two containers, one for postrgresql and one for Django backend.

`docker-compose -f backend.yml up --build --detach`

After this, you can install the javascript packages with `npm install` and launch the frontend with `npm start` from the frontend folder. The app is reachable at http://localhost:8080/

For more information about React and Webpack please visit https://aiki.dev/posts/a-bit-of-react/  and https://aiki.dev/posts/connect-frontend-backend/





### Deploying in real world 

Now everything is ready. You need to bring your files somewhere where Docker and Docker-compose are installed. In my case, I use a Synology NAS. I also use a Dynamic DNS to point to the external IP of my touter and a reverse proxy to forward to the correct port on my NAS. 

In my case, my domain name is https://mapariel.dd-dns.de. The only thing to change are the environments variables BASE_URL and BASE_API in the docker-compose.yml file.  

