
import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterService } from "@/services/register.js";
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js';
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error.js';
import { makeRegisterService } from '@/services/factories/make-register-service.js';

const createUserSchema = z.object({
    name: z.string().nonempty(),
    email: z.email().nonempty(),
    password: z.string().nonempty().min(6)
})

export async function register (req: FastifyRequest, reply: FastifyReply) {
    const {name, email, password} = createUserSchema.parse(req.body);
    try{
        const registerService = makeRegisterService()
        
        await registerService.execute({name, email, password})
        return reply.status(201).send()
    }
    catch(err: any){
   
    if(err instanceof UserAlreadyExistsError){
        return reply.status(409).send({message: err.message})
    }
     
    throw err
    }
    
    
}