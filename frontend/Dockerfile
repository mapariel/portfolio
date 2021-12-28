FROM node:alpine AS build

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS final

COPY --from=build /build/* /usr/share/nginx/html/
RUN mkdir /usr/share/nginx/mediafiles
COPY default.conf /etc/nginx/conf.d/
