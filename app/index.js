import {config} from "dotenv";
config()
import  cors from 'cors';
import express from "express";
import fileUpload from 'express-fileupload';
import { sequelize } from "./services/database.js";
import { router as routers } from "./routers/index.js";
const app = express();
const {PORT} = process.env;

(async () => {
  await sequelize.sync({ force: true });

  console.log('Connection has been established successfully');
})();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(fileUpload());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(routers);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});