import express from 'express';
import User from "../Models/User";
import UserController from "../Controllers/UserController";

export const anonymeRouteUser = express.Router();

anonymeRouteUser
    .post('/connection', async (req, res) => {
        const user = new UserController(User);
        const connection = await user.connection(req.body);

        if(connection.type === "error"){
            res.status(401).json(connection);
        }else {
            res.status(200).json(connection);
        }
    })

    .post('/createUser', async (req, res) => {
        const modelUser = new User({username: req.body.username, password: req.body.password});
        const user = new UserController(modelUser);
        const createUser = await user.createUser();

        if(createUser.type === "error"){
            res.status(400).json(createUser);
        }else {
            res.status(201).json(createUser);
        }
    })

    .put('/changePassword/:id', async (req, res) => {
        const user = new UserController(User);
        const updatePassword = await user.updatePasswordUserByID(req.params.id, req.body);

        if(updatePassword.type === "error"){
            res.status(400).json(updatePassword);
        }else {
            res.status(200).json(updatePassword);
        }
    })