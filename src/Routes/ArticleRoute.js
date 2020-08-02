import express from 'express';
import ArticleController from "../Controllers/ArticleController";
import Article from "../Models/Article";

export const anonymeRouteArticle = express.Router();

anonymeRouteArticle
    .get('/all', async (req, res) => {
        const art = new ArticleController(Article);
        res.status(200).json(await art.getAllArticle());
    });