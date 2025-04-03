
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status-codes'
import router from './app/routes';
import global_Error_Handler from './app/errors/GlobalErrorHandler';


const app:Application = express();

app.use(express.json());
app.use(cors());


app.use('/api/v1',router);

app.get('/',(req:Request,res:Response)=>{
    res.status(httpStatus.OK).json({
       success:true,
       message:"Server is running !"
    })
})

// app.use("*",(req:Request,res:Response)=>{
//     res.status(httpStatus.NOT_FOUND).json({
//         success:false,
//         message : "Route Not Found !"
//     })
// })

// error route
app.use(global_Error_Handler);


export default app;