FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

COPY package*.json ./

RUN npm install


EXPOSE 8000

CMD [ "npm", "run", "dev" ]

# RUN npm run dev