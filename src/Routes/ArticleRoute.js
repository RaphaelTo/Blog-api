import express from 'express';
import ArticleController from "../Controllers/ArticleController";
import Article from "../Models/Article";

export const anonymeRouteArticle = express.Router();
export const adminRouteArticle = express.Router();

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
    });

adminRouteArticle
    .post('/add', async (req, res) => {
        const articleInstance = new Article(req.body);
        const article = new ArticleController(articleInstance);
        const createArticle = await article.createArticle();

        if(createArticle.type === "error"){
            res.status(400).json(createArticle);
        }else {
            res.status(201).json(createArticle);
        }
    })

    .delete('/deleteById/:id', async (req, res) => {
        const article = new ArticleController(Article);
        const deleteArticle = await article.deleteArticleById(req.params.id);

        if(deleteArticle.type === "error"){
            res.status(404).json(deleteArticle);
        }else {
            res.status(200).json(deleteArticle);
        }
    })

    .put('/updateById/:id', async (req, res) => {
        const article = new ArticleController(Article);
        const updateArticle = await article.updateArticleById(req.params.id, req.body);

        if(updateArticle.type === "error"){
            res.status(404).json(updateArticle);
        }else {
            res.status(200).json(updateArticle);
        }
    });