FROM node:19.8-alpine3.16

EXPOSE 3000
RUN npm i -g pnpm

WORKDIR /online-energieausweis
COPY ./package.json ./
RUN pnpm install --prod
COPY . .

CMD ["pnpm", "run", "build:production"]