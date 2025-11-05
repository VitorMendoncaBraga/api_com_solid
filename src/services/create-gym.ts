import type { IUsersRepository } from "@/repositories/users-repository.js"
import type { Gym, User } from "@/generated/prisma/index.js"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js"
import type { IGymRepository } from "@/repositories/gyms-repository.js"

interface ICreateGymServiceRequest{
   title: string,
   description: string | null,
   phone: string | null,
   latitude: number,
   longitude: number
}


interface ICreateGymServiceResponse{
    gym: Gym
}

export class CreateGymService {

    private gymRepository: IGymRepository

    constructor(
        gymRepository: IGymRepository
    ){
        this.gymRepository = gymRepository
    }
  // significa que esse método execute vai retornar uma promise de usuario
    async execute({title, description, phone, latitude, longitude}: ICreateGymServiceRequest) : Promise<ICreateGymServiceResponse>{
        const gym = await this.gymRepository.create({title, description, phone, latitude, longitude})
        return {gym}

        
    
}
}
