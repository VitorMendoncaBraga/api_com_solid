import type { Gym, Prisma } from "@/generated/prisma/index.js";

export interface IFindManyNearbyParams{
    latitude: number,
    longitude: number
}

export interface IGymRepository{
    findById(id: string): Promise<Gym | null>;
    searchMany(query: string, page: number): Promise<Gym[]>
    findManyNearby(params: IFindManyNearbyParams): Promise<Gym[]>
    create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>
}