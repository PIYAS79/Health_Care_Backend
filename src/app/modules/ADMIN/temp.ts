import { Prisma, PrismaClient } from "@prisma/client"



const prisma = new PrismaClient();




const get_All_Admin_Service = async (query: Record<string, unknown>, pgOptions: Record<string, unknown>) => {

    const andConditions: Prisma.AdminWhereInput[] = []
    const searchFields = ['name', 'email'];
    const { search, ...exactMatchFields } = query;
    const { page, limit, sortBy, sortOrder } = pgOptions;
    const pageNumber = Number(page);
    const limitNUmber = Number(limit);

    if (search) {
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


    const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }
    const admins = await prisma.admin.findMany({
        where: whereConditions,
        skip: (pageNumber - 1) * limitNUmber,
        take: limitNUmber,
        orderBy: sortBy && sortOrder && typeof sortBy === 'string' && typeof sortOrder === 'string' ? {
            [sortBy]: sortOrder
        } : {
            createdAt: 'desc'
        }
    })

    return {
        data: admins,
        meta: {}
    }

}


const PickExactKeyss = <T extends Record<string, unknown>, k extends keyof T>(obj: T, keys: k[]): Partial<T> => {
    const finalObj: Partial<T> = {};

    for (let key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key]
        }
    }

    return finalObj;
}   