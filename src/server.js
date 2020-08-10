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

//Import middleware
import { checkToken } from "./Middleware/JWT";

//Import Route
import { anonymeRouteArticle, adminRouteArticle } from "./Routes/ArticleRoute";
import { anonymeRouteCategory, adminRouteCategory } from "./Routes/CategoryRoute";
import { anonymeRouteUser, adminRouteUser } from "./Routes/UserRoute";

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(`${process.env.URL}/article`, anonymeRouteArticle);
app.use(`${process.env.URL}/category`, anonymeRouteCategory);
app.use(`${process.env.URL}/user`, anonymeRouteUser);
app.use(`${process.env.URL}/admin/article`, checkToken, adminRouteArticle);
app.use(`${process.env.URL}/admin/category`, checkToken, adminRouteCategory);
app.use(`${process.env.URL}/admin/user`, checkToken, adminRouteUser);


app.listen(process.env.PORT, () => console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`));