import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { User_Services } from "./user.services";
import httpStatus from 'http-status-codes'



const createAdmin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await User_Services.createAdmin_Service(req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: "successfully create an admin !",
        data: result
    })
})

export const User_Controllers = {
    createAdmin_Controller,

}