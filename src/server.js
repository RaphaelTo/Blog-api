//Import module
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

//Import DB
import Connection from "./Provider/Connection";
import { identifiantDB } from "./Provider/identifiantDB";

const mongo = new Connection(identifiantDB);

mongo.connect();

//Import Route
import { anonymeRouteArticle } from "./Routes/ArticleRoute";

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(`${process.env.URL}/article`,anonymeRouteArticle);

app.listen(process.env.PORT, () => console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`));