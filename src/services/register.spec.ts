import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository.js'
import { expect, describe, it, beforeEach} from 'vitest'
import { RegisterService } from './register.js'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'


// TESTES UNITARIOS NÃO USAM O BANCO DE DADOS ORIGINAL, USAMOS IN MEMORY
 let usersRepository: InMemoryUserRepository
 let registerService: RegisterService
describe("Register service", () => {

beforeEach(() => {
     usersRepository = new InMemoryUserRepository()
     registerService = new RegisterService(usersRepository) 
})

    it("should hash user password upon registration", async () => {

       

        const { user } = await registerService.execute({
            name: "John Doe",
            email: "jonhdoe@example.com",
            password: "123456"
        })
        
        const isPasswordCorrectlyHashed = await compare("123456", user.password_hash)
        expect(isPasswordCorrectlyHashed).toBe(true)

    })

    it("should not be able to register with email that already exists", async () => {

       

        const user = {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "1234"
        }

        const user2 = {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "1234"
        }

        await registerService.execute(user)
        
        await expect( () => 
            registerService.execute(user2)
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

    it("should be able to register an unexist user", async () => {
       
     

        const userExample = {
            name: "John Doe",
            email: "johndoe2@example.com",
            password: "1234"
        }

        const { user } = await registerService.execute(userExample)
        // Espero que ache o usuario com o mesmo id criado 
        expect(user.id).toEqual(expect.any(String))


    })
})