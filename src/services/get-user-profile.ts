import type { User } from "@/generated/prisma/index.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.js";


interface IGetUserProfileRequest {
    userId: string
}

export class GetUserProfileService {

    private usersRepository: IUsersRepository
    constructor(userRepository: IUsersRepository){
        this.usersRepository = userRepository
    }

    async execute({userId}: IGetUserProfileRequest): Promise<User>{
        const user = await this.usersRepository.findById(userId)
        if(!user){
            throw new ResourceNotFoundError()
        }

        return user
    }


}