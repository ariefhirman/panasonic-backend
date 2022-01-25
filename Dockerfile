FROM node:14

WORKDIR /panasonic-backend
COPY package.json .
RUN npm run install
COPY . .
CMD npm run start