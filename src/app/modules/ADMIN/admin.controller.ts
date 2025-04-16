import { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from 'http-status-codes'
import { Admin_Services } from "./admin.services";
import { PickExactKeys } from "../../utils/pick";






const get_All_Admin_Controller = Async_Catch(async (req: Request, res: Response,) => {
    const filters = PickExactKeys(req.query, ['name', 'email', 'contactNumber'])
    const options = PickExactKeys(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await Admin_Services.get_All_Admin_Service(filters, options);
    res.status(httpStatus.OK).json({
        success: true,
        message: "successfully get all admins !",
        meta: result.meta,
        data: result.data
    })
})

const get_Single_Admin_Controller = Async_Catch(async (req: Request, res: Response,) => {
    const {id} = req.params;
    const result = await Admin_Services.get_Single_Admin_Service(id);
    res.status(httpStatus.OK).json({
        success: true,
        message: "successfully get all admins !",
        data: result
    })
})

const update_Admin_Controller = Async_Catch(async(req:Request,res:Response)=>{
    const {id} = req.params;
    const data = req.body;
    const result = await Admin_Services.update_Admin_Service(id,data);
    res.status(httpStatus.OK).json({
        success: true,
        message: "successfully update the admins !",
        data: result
    })
})

const delete_Admin_Controller = Async_Catch(async(req:Request,res:Response)=>{
    const {id} = req.params;
    const result = await Admin_Services.deleteAdmin_Service(id);
    res.status(httpStatus.OK).json({
        success: true,
        message: "successfully Delete the admins !",
        data: result
    })
})

export const Admin_Controllers = {
    get_All_Admin_Controller,
    get_Single_Admin_Controller,
    update_Admin_Controller,
    delete_Admin_Controller

}