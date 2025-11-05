import type { IUsersRepository } from "@/repositories/users-repository.js"
import type { User } from "@/generated/prisma/index.js"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js"

interface IRegisterServiceRequest{
    name: string,
    email: string,
    password: string,
}


interface IRegisterServiceResponse{
    user: User
}

export class RegisterService {

    private usersRepository: IUsersRepository

    constructor(
        usersRepository: IUsersRepository
    ){
        this.usersRepository = usersRepository
    }
  // significa que esse método execute vai retornar uma promise de usuario
    async execute({name, email, password}: IRegisterServiceRequest) : Promise<IRegisterServiceResponse>{

    const password_hash = await hash(password, 6)
    // const prismaUsersRepository = new PrismaUsersRepository()  CONST { D } = SOLID   -- DEPENDENCY INVERSION PRINCIPLE...DEPENDA DE ABSTRAÇÕES E NÃO DE INSTÂNCIAS

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if(userWithSameEmail){
       throw new UserAlreadyExistsError()
    }

    const payload = {
        name, 
        email, 
        password_hash
    }

    const user = await this.usersRepository.create(payload)

    return {
        user,
    }
    
}
}
