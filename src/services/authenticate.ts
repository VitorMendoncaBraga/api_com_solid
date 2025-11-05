import type { IUsersRepository } from "@/repositories/users-repository.js";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";
import { compare } from "bcryptjs";
import type { User } from "@/generated/prisma/index.js";

interface IAuthenticateServiceRequest{
    email: string,
    password: string
}

interface IAuthenticateServiceResponse {
    user: User
}

export class AuthenticateService {
    private userRepository: IUsersRepository
    constructor(usersRepository: IUsersRepository){
        this.userRepository = usersRepository
    }

    async execute({email, password}: IAuthenticateServiceRequest) : Promise<IAuthenticateServiceResponse>{
        const user = await this.userRepository.findByEmail(email);
        if(!user){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash);

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return {
            user,
        }

    }
}