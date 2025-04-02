import express from 'express';
import { User_Controllers } from './user.controller';

const router = express.Router();




// create admin route
router.post('/admin',User_Controllers.createAdmin_Controller);





export const User_Routes = router;
