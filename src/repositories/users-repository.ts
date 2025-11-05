import type { User } from "@/generated/prisma/index.js"
import type { CreateUserSchema } from "./prisma/prisma-users-repository.js"


 export interface IUsersRepository {
    create(data: CreateUserSchema): Promise<User>
    findByEmail(email: string) : Promise<User | undefined>
    findById(id: string): Promise<User | null> 
 }