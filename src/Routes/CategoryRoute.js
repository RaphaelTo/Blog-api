import express from 'express';
import Category from '../Models/Category';
import CategoryController from '../Controllers/CategoryController';

export const anonymeRouteCategory = express.Router();

anonymeRouteCategory
    .get('/all', async (req, res) => {
        const cat = new CategoryController(Category);
        res.status(200).json(await cat.getAllCategory());
    })

    .get('/byId/:id', async (req, res) => {
        const cat = new CategoryController(Category);
        const byID = await cat.getCategoryById(req.params.id);

        if(byID.type === "error"){
            res.status(404).json(byID)
        } else {
            res.status(200).json(byID)
        }
    })

    .post('/add', async (req, res) => {
        const createInstanceCat = new Category({name: req.body.name});
        const category = new CategoryController(createInstanceCat);
        const addCat = await category.createCategory();

        res.status(201).json(addCat);
    })