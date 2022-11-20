How to run the application:

1. Copy all variables from the .env.example file and paste to .env file

2. Install packages:
    npm install

3. Run command:
    npm run dev

The app is ready)

How to run the application with docker:

1. In the root directory of this project run the following command

    docker build . -t test-nodejs-webbylab

Wait for the image finishes installing

2. Run the following command (use any available port on your machine instead of 8000):

   docker run -p 8000:8080 test-nodejs-webbylab

The app is ready)



