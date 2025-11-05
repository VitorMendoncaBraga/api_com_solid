

import { ResourceNotFoundError } from "@/services/errors/resource-not-found.js";
import { makeGetUserProfileServiceService } from "@/services/factories/make-get-user-profile-service.js";
import type { FastifyRequest, FastifyReply } from "fastify";





export async function profile(req: FastifyRequest, reply: FastifyReply){
    
    try {
        const getUserProfile = makeGetUserProfileServiceService()

    const user = await getUserProfile.execute({userId: req.user.sub})

    const userWithoutPassword = {
        ...user,
        password_hash: undefined
        
    }

    return reply.status(200).send({userWithoutPassword,})
    } catch (error) {
        if(error instanceof ResourceNotFoundError){
            reply.status(404).send({error: error.message})
        }
    }
}