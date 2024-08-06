# pull official base image
FROM node:20.5.1-alpine


ARG NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST

ARG NEXT_PUBLIC_OOGLE_CLIENT_ID
ENV NEXT_PUBLIC_OOGLE_CLIENT_ID=$NEXT_PUBLIC_OOGLE_CLIENT_ID

ARG NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI
ENV NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI=$NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI

RUN echo $NEXT_PUBLIC_API_HOST

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

# CMD ["npx", "serve", "-s", "build"]
CMD ["npm", "start"]
