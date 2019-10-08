FROM nginx:alpine

# Install dependencies
RUN apk update && apk add --virtual native-deps\
	g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git npm nodejs && \
	npm install --quiet node-gyp -g
RUN git clone https://github.com/kronendieb/SEManagement2019.git

WORKDIR /SEManagement2019/hotBurger

RUN npm install --production

EXPOSE 80

CMD ["node","app.js"]
