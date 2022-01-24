FROM node:14

WORKDIR /project-warehouse
COPY package.json .
RUN npm install
COPY . .
CMD npm start