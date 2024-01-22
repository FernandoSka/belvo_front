FROM node:20-buster-slim

RUN apt update && apt -y upgrade

RUN mkdir /belvo_app

COPY . /belvo_app


WORKDIR /belvo_app

ENTRYPOINT [ "/belvo_app/entrypoint.sh" ]
