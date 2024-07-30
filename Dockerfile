# pull official base image
FROM node:20.5.1-alpine


ARG REACT_APP_API_HOST
ENV REACT_APP_API_HOST=$REACT_APP_API_HOST

ARG REACT_APP_GOOGLE_CLIENT_ID
ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID

ARG REACT_APP_GOOGLE_OAUTH_REDIRECT_URI
ENV REACT_APP_GOOGLE_OAUTH_REDIRECT_URI=$REACT_APP_GOOGLE_OAUTH_REDIRECT_URI

RUN echo $REACT_APP_API_HOST

# set working directory
WORKDIR /reactapp

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# build app
RUN npm run build

# Open Port
EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]
