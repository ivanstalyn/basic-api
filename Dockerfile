FROM registry.access.redhat.com/ubi8/nodejs-14-minimal:1-77

WORKDIR /opt/app-root/src

COPY package.json /opt/app-root/src
RUN npm install --only=prod
COPY servidor /opt/app-root/src/servidor
COPY public /opt/app-root/src/public

CMD ["npm", "start"]
