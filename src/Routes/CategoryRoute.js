import express from 'express';
import Category from '../Models/Category';
import CategoryController from '../Controllers/CategoryController';

export const anonymeRouteCategory = express.Router();
export const adminRouteCategory = express.Router();

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
    });

adminRouteCategory
    .post('/add', async (req, res) => {
        const createInstanceCat = new Category({name: req.body.name});
        const category = new CategoryController(createInstanceCat);
        const addCat = await category.createCategory();

        if(addCat.type === "error"){
            res.status(400).json(addCat);
        } else {
            res.status(201).json(addCat);
        }
    })

    .delete('/deleteById/:id', async (req, res) => {
        const category = new CategoryController(Category);
        const deleteCat = await category.deleteCategoryById(req.params.id);

        if(deleteCat.type === "error"){
            res.status(404).json(deleteCat);
        } else {
            res.status(200).json(deleteCat);
        }
    })

    .put('/updateById/:id', async (req, res) => {
        const category = new CategoryController(Category);
        const updateCat = await category.updateCategoryById(req.params.id, {name: req.body.name});

        if(updateCat.type === "error"){
            res.status(404).json(updateCat);
        } else {
            res.status(200).json(updateCat);
        }
    })