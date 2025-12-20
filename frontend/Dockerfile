FROM node:20-alpine 

WORKDIR /bizzufront

COPY yarn.lock .

RUN yarn install 

COPY . .

EXPOSE 5173

CMD ["yarn", "dev", "--host"]