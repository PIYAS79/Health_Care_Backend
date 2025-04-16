

import express from 'express';
import { Admin_Controllers } from './admin.controller';


const router = express.Router();



// get all admin data route
router.get('/',Admin_Controllers.get_All_Admin_Controller);
router.get('/:id',Admin_Controllers.get_Single_Admin_Controller);
router.patch('/:id',Admin_Controllers.update_Admin_Controller);
router.delete('/:id',Admin_Controllers.delete_Admin_Controller);




export const Admin_Routes = router;
