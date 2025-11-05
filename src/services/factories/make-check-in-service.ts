import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"
import { ValidadeCheckInService } from "../validade-check-in.js"
import { CheckInService } from "../check-in.js"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js"


export function makeCheckInService(){
    const checkInRepository = new PrismaCheckInsRepository()
    const gymRepository = new PrismaGymsRepository
    const checkInService  = new CheckInService(checkInRepository, gymRepository)
    return checkInService
}