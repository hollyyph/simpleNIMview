# Build
FROM node:lts-alpine as builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

# Serve
FROM nginx:stable

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# port http
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 