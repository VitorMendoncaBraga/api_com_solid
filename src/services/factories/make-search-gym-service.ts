import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js";
import { SearchGymsService } from "../search-gyms.js";

export function makeSerchGymsService(){
    const gymRepository = new PrismaGymsRepository
    const searchGymsService = new SearchGymsService(gymRepository)
    return searchGymsService
}

