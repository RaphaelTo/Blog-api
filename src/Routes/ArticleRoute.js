import express from 'express';

export const anonymeRouteArticle = express.Router();

anonymeRouteArticle
    .get('/all', (req, res) => {
        console.log('hello all');
    });