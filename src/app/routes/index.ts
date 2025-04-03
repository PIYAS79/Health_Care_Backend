
import express from 'express'
import { User_Routes } from '../modules/USER/user.routes';
import { Admin_Routes } from '../modules/ADMIN/admin.routes';

const router = express.Router();


const Project_Router = [
    {
        path : '/user',
        routes : User_Routes
    },
    {
        path : '/admin',
        routes : Admin_Routes
    }
]

Project_Router.forEach((one)=>router.use(one.path,one.routes));
export default router;