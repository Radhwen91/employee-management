FROM node:20.10.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install 
##RUN npx ngcc --properties es2023 browser module main --first-only --ceate-ivy-entry-points
COPY . .
RUN npm run build
FROM nginx:latest
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/employee-management/ /usr/share/nginx/html
EXPOSE 80
