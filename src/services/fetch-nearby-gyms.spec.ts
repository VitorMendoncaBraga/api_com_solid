import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository.js";
import { CreateGymService } from "./create-gym.js";
import { FetchNearbyGyms } from "./fetch-nearby-gyms.js";

let gymRepository: InMemoryGymRepository;
let fetchNearbyGyms: FetchNearbyGyms;

describe("Create gym service", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    fetchNearbyGyms = new FetchNearbyGyms(gymRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
        title: "gym-01",
        latitude: 0,
        longitude: 0
    })

    await gymRepository.create({
        title: "gym-02",
        latitude: 0,
        longitude: 0
    })
    await gymRepository.create({
        title: "gym-03",
        latitude: 12312312,
        longitude: 1231232,
    })

    const {gyms} = await fetchNearbyGyms.execute({
        userLatitude: 0,
        userLongitude: 0
    })


    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
        expect.objectContaining({title: "gym-01"}),
        expect.objectContaining({title: "gym-02"})
    ])

  })
  

   
  
});
