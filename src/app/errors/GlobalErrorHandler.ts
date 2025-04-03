import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status-codes'
import {ZodError, ZodIssue} from 'zod';
import Final_App_Error from './FinalAppError';

 type Erorr_Source_Type = {
    path: string | number,
    message: string
}[]

const zodValidationError=(err:ZodError)=>{
    const errorTitle = "Type Validation Error (zod) *";
    const errorSouce:Erorr_Source_Type = err.issues.map((one:ZodIssue)=>({
        path:one.path[one.path.length-1],
        message : one.message
    }))
    return {errorTitle,errorSouce}
}

const global_Error_Handler = (err: any, req: Request, res: Response, next: NextFunction) => {
   
    let errorTitle = "There is a server side error *"
    let errorSource :Erorr_Source_Type = [{
        path : '',
        message :  "There is a server side error *"
    }]
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

    if(err instanceof ZodError){
        const gettedFormat = zodValidationError(err);
        errorTitle = gettedFormat.errorTitle;
        errorSource = gettedFormat.errorSouce;
    }else if(err instanceof Error){
        errorTitle = err.message,
        errorSource = [{
            path : '',
            message : err.message
        }]
    }else if(err instanceof Final_App_Error){
        errorTitle = err.message,
        errorSource = [{
            path : '',
            message : err.message
        }]
        statusCode=err.statusCode
    }

    res.status(statusCode).json({
        success: false,
        errorTitle,
        errorSource,
        stack: err.stack,
        err
    })
}

export default global_Error_Handler;