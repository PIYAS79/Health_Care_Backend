
import express from 'express'
import { User_Routes } from '../modules/USER/user.routes';

const router = express.Router();


const Project_Router = [
    {
        path : '/user',
        routes : User_Routes
    }
]

Project_Router.forEach((one)=>router.use(one.path,one.routes));
export default router;