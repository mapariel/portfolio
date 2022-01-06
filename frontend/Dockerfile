FROM node:alpine AS build

ARG BASE_URL
ENV BASE_URL ${BASE_URL}

ARG BASE_API
ENV BASE_API ${BASE_API}





COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS final

COPY --from=build /build/* /usr/share/nginx/html/
RUN mkdir /usr/share/nginx/mediafiles
COPY default.conf /etc/nginx/conf.d/



