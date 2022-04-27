# STAGE 1
FROM node:12-alpine as typescript_base
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm install -g typescript ts-node
USER node
RUN npm install
COPY --chown=node:node . .
RUN npm run build

# STAGE 2
FROM node:12-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install --production
COPY --from=typescript_base /home/node/app/build ./build
COPY --chown=node:node .env .
COPY --chown=node:node  /public ./public

EXPOSE 4001
CMD [ "node", "build/index.js" ]
