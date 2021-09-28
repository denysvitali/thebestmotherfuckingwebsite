FROM node:16 AS builder
COPY . /app
WORKDIR /app
RUN yarn install && yarn build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/thebestmotherfuckingwebsite.conf /etc/nginx/conf.d/tbmfw.conf
COPY ./nginx/snippets /etc/nginx/snippets
