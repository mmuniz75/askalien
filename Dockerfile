FROM node

ENV HOME=/usr/src/app
RUN mkdir $HOME
WORKDIR $HOME

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]

