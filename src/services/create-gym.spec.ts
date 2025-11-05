import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileService } from "./get-user-profile.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.js";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository.js";
import { CreateGymService } from "./create-gym.js";

let gymRepository: InMemoryGymRepository;
let createGymService: CreateGymService;

describe("Create gym service", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    createGymService = new CreateGymService(gymRepository);
  });

  it('should be able to create gym', async () => {
    const {gym} =  await createGymService.execute({
        title: "Gym01",
        description: null,
        latitude: 122241,
        longitude: 1231255,
        phone: null
    })

    expect(gym.id).toEqual(expect.any(String))

  })
  

   
  
});
