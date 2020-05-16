FROM node:12 AS builder
COPY . /app
WORKDIR /app
RUN yarn install && yarn build

FROM nginx:1.18-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/thebestmotherfuckingwebsite.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/snippets /etc/nginx/snippets
