import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from "cors"

import {errorHandlerMiddleware} from "./middlewares/errorHandlerMiddleware";

import routes from "./routes";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "pug" );

app.use(bodyParser.json({ limit: '2MB' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routes)

app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
