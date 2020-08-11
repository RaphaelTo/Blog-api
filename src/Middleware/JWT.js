import JWT from 'jsonwebtoken';
import { errorResponse } from "../responseJson";

export const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if(token) {
        JWT.verify(token, process.env.SECRETTOKEN, (err, decoded) => {
            if(err) {
                return res.json(errorResponse(err.message));
            }
            req.decoded = decoded;
            next();
        })
    }else {
        return res.json(errorResponse('Auth token is not supplied'));
    }
};