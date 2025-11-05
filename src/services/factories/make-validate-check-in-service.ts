import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"
import { ValidadeCheckInService } from "../validade-check-in.js"


export function makeValidateService(){
    const checkInRepository = new PrismaCheckInsRepository()
    const validateCheckInService  = new ValidadeCheckInService(checkInRepository)
    return validateCheckInService
}