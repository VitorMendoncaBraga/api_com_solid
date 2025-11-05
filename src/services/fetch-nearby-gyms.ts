import type { Gym } from "@/generated/prisma/index.js";
import type { IGymRepository } from "@/repositories/gyms-repository.js";

interface IFetchNearbyGymsRequest { 
    userLatitude: number,
    userLongitude: number,
}

interface IFetchNearbyGymsResponse { 
   gyms: Gym[]
}

export class FetchNearbyGyms {
    private gymsRepository: IGymRepository
    constructor(gymsRepository: IGymRepository){
        this.gymsRepository = gymsRepository
    }

    async execute({userLatitude, userLongitude}: IFetchNearbyGymsRequest): Promise<IFetchNearbyGymsResponse>{
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return {
            gyms,
        }
    }
}