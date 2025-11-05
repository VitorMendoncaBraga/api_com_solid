import type { User } from "@/generated/prisma/index.js";
import type { CreateUserSchema } from "../prisma/prisma-users-repository.js";
import type { IUsersRepository } from "../users-repository.js"
import { ResourceNotFoundError } from "@/services/errors/resource-not-found.js";

export class InMemoryUserRepository implements IUsersRepository{

    public items: User[] = []
    
    async findByEmail(email: string) {
        const user = this.items.find(user => user.email == email)
        if(!user){
            return 
        }

        return user
    }
    
    async create(data: CreateUserSchema) {
        const user: User = {
            ...data,
            id: "1234",
            created_at: new Date()
        }

        await this.items.push(user)
        return user
    }

    async findById(id: string) {
        const user = this.items.find(user => user.id == id)
        if(!user){
            throw new ResourceNotFoundError()   
        }

        return user
    }
}