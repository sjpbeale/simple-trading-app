FROM node:14.17-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent

COPY . ./

EXPOSE 5000
CMD ["npm", "run", "start"]
