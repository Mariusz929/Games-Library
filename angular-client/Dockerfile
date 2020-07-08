### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###npm run build
FROM nginx:1.17.1-alpine
##heehszki
COPY --from=build /usr/src/app/dist/angular-client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
