import type { Gym } from "@/generated/prisma/index.js";
import type { IGymRepository } from "@/repositories/gyms-repository.js";

interface ISearchGymsServiceRequest{
    query: string,
    page: number
}

interface ISearchGymsServiceResponse{
    gyms: Gym[]
}

export class SearchGymsService {
    private gymsRepository: IGymRepository
    constructor(gymRepository: IGymRepository){
        this.gymsRepository = gymRepository
    }

    async execute({query, page}: ISearchGymsServiceRequest): Promise<ISearchGymsServiceResponse>{
        const gyms = await this.gymsRepository.searchMany(query, page)
        return {
            gyms
        }
    }
}