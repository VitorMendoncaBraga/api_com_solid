import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js";
import { FetchNearbyGyms } from "../fetch-nearby-gyms.js";

export function  makeFetchNearbyGymsService(){
    const gymRepository = new PrismaGymsRepository
    const fetchNearbyGymsService = new FetchNearbyGyms(gymRepository)
    return fetchNearbyGymsService
}