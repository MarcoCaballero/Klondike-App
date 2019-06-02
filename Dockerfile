FROM node:10 as builder

COPY package*.json ./

RUN npm i && mkdir /Klondike-App && cp -R ./node_modules ./Klondike-App

WORKDIR /Klondike-App

COPY . .

# moving drag-dropfix
RUN cp -f ./src/fixes/drag-drop.es5* ./node_modules/@angular/cdk/esm5 && \
    cp -f ./src/fixes/drag-drop.js* ./node_modules/@angular/cdk/esm2015

RUN $(npm bin)/ng build --prod

FROM nginx

COPY nginx/default.conf /etc/nginx/conf.d/

### Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /Klondike-App/dist /usr/share/nginx/html

CMD ["nginx"]
