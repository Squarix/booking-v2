FROM tiangolo/node-frontend:10 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN yarn --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN SKIP_PREFLIGHT_CHECK=true yarn build

# production environment
FROM nginx:1.15
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
