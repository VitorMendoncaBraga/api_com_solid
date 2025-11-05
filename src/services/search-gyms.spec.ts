import type { IGymRepository } from "@/repositories/gyms-repository.js";
import { beforeAll, describe, expect, it } from "vitest";
import { SearchGymsService } from "./search-gyms.js";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository.js";
import { object } from "zod";

let gymsRepository: IGymRepository
let searchGymsService: SearchGymsService

describe("Search gyms service", () => {
    beforeAll(() => {
        gymsRepository = new InMemoryGymRepository()
        searchGymsService = new SearchGymsService(gymsRepository)
    })
    it("should be able to search gyms", async () => {
        await gymsRepository.create({
            title: "Java",
            latitude: 0,
            longitude: 0,
            description: null,
            phone: null
        })
        await gymsRepository.create({
            title: "JavaScript",
            latitude: 0,
            longitude: 0,
            description: null,
            phone: null
        })

        const {gyms} = await searchGymsService.execute({
            query: "Java",
            page: 1
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title: "Java"}),
            expect.objectContaining({title: "JavaScript"}),
        ])
    })
    it("should be able to fetch paginated gyms", async () => {
        for(let i = 1; i <= 22; i++){
            await gymsRepository.create({
            title: `gym-${i}`,
            latitude: 0,
            longitude: 0,
            description: null,
            phone: null
        })
        }

        const {gyms} = await searchGymsService.execute({
            query: "gym",
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title: "gym-21"}),
            expect.objectContaining({title: "gym-22"})
        ])
    })
})