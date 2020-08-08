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