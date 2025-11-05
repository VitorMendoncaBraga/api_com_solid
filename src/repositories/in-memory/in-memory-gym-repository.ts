import type { Gym, Prisma } from "@/generated/prisma/index.js";
import type { IFindManyNearbyParams, IGymRepository } from "../gyms-repository.js";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordenates.js";

export class InMemoryGymRepository implements IGymRepository{
    public items: Gym[] = []
   async findById(id: string) {
        const gym = await this.items.find(gym => gym.id == id)
        if(!gym){
            return null
        }

        return gym
    }

    async create(data: Prisma.GymUncheckedCreateInput) {
        const {id, title, description, phone, latitude, longitude} = data

        const gym: Gym = {
            id: id ?? randomUUID(),
            title,
            description: description ?? null,
            latitude: new Decimal(latitude.toString()),
            longitude: new Decimal(longitude.toString()),
            phone: phone ?? null
        }

        await this.items.push(gym)
        return gym
    }

    async searchMany(query: string, page: number) {
        return this.items.filter(gym => gym.title.includes(query)).slice((page - 1) * 20, page * 20)
    }

    async findManyNearby({latitude,longitude}: IFindManyNearbyParams) {
        return this.items.filter(gym => {
            const distance = getDistanceBetweenCoordinates({
                latitude,
                longitude,
            }, {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber(),
            })

            return distance < 10
        })
        // const nearbyGyms = []
        // for(let gym of this.items){
        //     const dist = await getDistanceBetweenCoordinates({
        //         latitude,
        //         longitude
        //     }, {
        //         latitude: gym.latitude.toNumber(),
        //         longitude: gym.longitude.toNumber()
        //     })

        //     if(dist <= 0.1){
        //         nearbyGyms.push(gym)
        //     }
        // }

        // return nearbyGyms
    }
}