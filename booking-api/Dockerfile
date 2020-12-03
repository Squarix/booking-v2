FROM node:12.13-alpine as production

WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 3000

RUN npm run build
CMD ["npm", "run", "start:prod"]
