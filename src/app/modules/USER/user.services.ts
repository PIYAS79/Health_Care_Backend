import {PrismaClient, User_Roles} from '@prisma/client'
import { Bcrypt_Hash_Pass } from '../../utils/bcrypt'



const prisma = new PrismaClient

const createAdmin_Service = async(data:any)=>{

    const userData = {
        password : await Bcrypt_Hash_Pass(data.password),
        email : data.admin.email,
        role : User_Roles.ADMIN
    }

    const TranResult = await prisma.$transaction(async(transactionClient)=>{
        await transactionClient.user.create({
            data:userData
        })
        const createdAdminData = await transactionClient.admin.create({
            data:data.admin
        })
        return {createdAdminData}
    })

    return TranResult;
}


export const User_Services = {
    createAdmin_Service,
}