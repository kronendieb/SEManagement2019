FROM nginx:alpine

# Install dependencies
RUN apk update && apk add --virtual native-deps\
	g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git npm nodejs && \
	npm install --quiet node-gyp -g\

RUN mkdir hotBurger

COPY ./orderCheckApp.js ./hotBurger/app.js
COPY ./availibility.json ./availibility.json
COPY ./../package.json/ ./package.json/
WORKDIR ./hotBurger

RUN npm install --production

EXPOSE 81

CMD ["node","app.js"]
