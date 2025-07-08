FROM node:18.14.2-bullseye-slim
LABEL maintainer="ACRI ST"

WORKDIR /app/
COPY . .
RUN rm -rf dist
RUN npm i
RUN rm -rf src/dev
RUN npm run build
RUN ls -la dist
RUN echo $PWD