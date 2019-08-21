FROM node:10-alpine

RUN apk --no-cache add --virtual builds-deps build-base python


#####################################
# ImageMagick:
#####################################

WORKDIR /var/www
ARG ENVIRONMENT
ENV ENVIRONMENT ${ENVIRONMENT}

ADD run.sh /run.sh
RUN chmod -v +x /run.sh
# RUN apk update and apk add
# RUN apk add --install imagemagick
# RUN apk add --install ffmpeg

RUN chown -R node:node .
USER node

CMD ["/run.sh"]

EXPOSE 3000