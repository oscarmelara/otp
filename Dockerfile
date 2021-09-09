FROM node:14-alpine as build-app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile 

COPY . ./

RUN yarn build

FROM nginx:1.19.10-alpine

COPY --from=build-app /app/build /usr/share/nginx/html
COPY --from=build-app /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
