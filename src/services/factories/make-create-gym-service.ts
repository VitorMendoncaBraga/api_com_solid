import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js";
import { CreateGymService } from "../create-gym.js";

export function makeCreateGymService(){
    const gymRepository = new PrismaGymsRepository
    const createGymService = new CreateGymService(gymRepository)
    return createGymService
}