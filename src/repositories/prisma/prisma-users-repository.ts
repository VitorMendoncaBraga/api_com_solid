import { prisma } from "@/lib/prisma.js";
import z from 'zod'
import type { IUsersRepository } from "../users-repository.js";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found.js";

const createUserSchema = z.object({
    name: z.string().nonempty(),
    email: z.email().nonempty(),
    password_hash: z.string().nonempty().min(6)
})

export type CreateUserSchema = z.infer<typeof createUserSchema>


export class PrismaUsersRepository implements IUsersRepository {
     async create(data: CreateUserSchema){
        const user = await prisma.user.create({
            data,
        })

        return user
    }

    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(user){
            return user
        }

        return 
    }

    async findById(id: string){
        const user = await prisma.user.findUnique({
            where: {
                id,
            }
        })

       if(!user){
        return null
       }

        return user
    }

    

   
}