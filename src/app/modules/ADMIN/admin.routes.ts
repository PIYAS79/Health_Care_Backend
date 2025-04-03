

import express from 'express';
import { Admin_Controllers } from './admin.controller';


const router = express.Router();



// get all admin data route
router.get('/',Admin_Controllers.get_All_Admin_Controller);




export const Admin_Routes = router;