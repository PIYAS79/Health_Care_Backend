import { Admin, Prisma, PrismaClient } from '@prisma/client'
import Final_App_Error from '../../errors/FinalAppError';

const prisma = new PrismaClient();


const get_All_Admin_Service = async (query: Record<string, unknown>, pgOptions: Record<string, unknown>) => {
    const { page, limit } = pgOptions;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const { search, ...exactMatchFields } = query;
    const andConditions: Prisma.AdminWhereInput[] = [];
    const searchFields = ['name', 'email'];

    if (query.search) {
        andConditions.push({
            OR: searchFields.map((field) => ({
                [field]: {
                    contains: query.search as string,
                    mode: 'insensitive'
                }
            }))
        })
    }
    if (Object.keys(exactMatchFields).length > 0) {
        andConditions.push({
            AND: Object.keys(exactMatchFields).map((key) => ({
                [key]: {
                    equals: exactMatchFields[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

    const admins = await prisma.admin.findMany({
        where: whereConditions,
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        orderBy: pgOptions.sortBy && pgOptions.sortOrder && typeof pgOptions.sortBy === 'string' && typeof pgOptions.sortOrder === 'string' ? {
            [pgOptions.sortBy]: pgOptions.sortOrder
        } : {
            createdAt: 'desc'
        }
    });
    const total = await prisma.admin.count({
        where: whereConditions
    })
    return {
        data: admins,
        meta: {
            page:pageNumber,
            limit:limitNumber,
            total
        }
    };
}

const get_Single_Admin_Service = async(id:string)=>{
    const data = await prisma.admin.findUnique({
        where:{id}
    })
    return data;
}

const update_Admin_Service = async(id:string,data:Partial<Admin>)=>{

    const isExist = await prisma.admin.findUnique({where:{id}});
    if(!isExist){
        throw new Final_App_Error(404,"Admin not found")
    }

    const result = await prisma.admin.update({
        where:{
            id:id
        },
        data
    })
    return result;
}

const deleteAdmin_Service = async(id:string)=>{
    const result= await prisma.$transaction(async(transactionClient)=>{
        const deletedAdminData = await transactionClient.admin.delete({
            where:{
                id
            }
        })
        const deletedUserData = await transactionClient.user.delete({
            where:{
                email:deletedAdminData.email
            }
        })
        return deletedAdminData
    })
    return result
}


export const Admin_Services = {
    get_All_Admin_Service,
    get_Single_Admin_Service,
    update_Admin_Service,
    deleteAdmin_Service
}