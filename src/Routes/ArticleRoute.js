import express from 'express';
import ArticleController from "../Controllers/ArticleController";
import Article from "../Models/Article";

export const anonymeRouteArticle = express.Router();

anonymeRouteArticle
    .get('/all', async (req, res) => {
        const art = new ArticleController(Article);
        res.status(200).json(await art.getAllArticle());
    })

    .get('/byId/:id', async (req, res) => {
        const article = new ArticleController(Article);
        const byID = await article.getArticleById(req.params.id);

        if(byID.type === "error"){
            res.status(404).json(byID);
        }else{
            res.status(200).json(byID);
        }
    })