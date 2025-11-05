import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository.js";
import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";
import { CheckInService } from "./check-in.js";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository.js";
import { FetchUserCheckInsHistoryService } from "./fetch-user-check-ins-history.js";
import { CreateGymService } from "./create-gym.js";
import { object } from "zod";

let checkInRepository: InMemoryCheckInsRepository;
let fetchUserCheckInsHistory: FetchUserCheckInsHistoryService;
let gymRepository: InMemoryGymRepository;
let createGymService: CreateGymService;
let checkInService: CheckInService;

describe("Fetch user check-ins history service", () => {
  // executa antes de cada um dos teste
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    fetchUserCheckInsHistory = new FetchUserCheckInsHistoryService(
      checkInRepository
    );
  });

  it("should be able to get user check-ins history", async () => {
    await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });
    await checkInRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });
    const { checkIns } = await fetchUserCheckInsHistory.execute({
      userId: "user-01",
      page: 1
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch pagineted user check-ins history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await fetchUserCheckInsHistory.execute({
      userId: "user-01",
      page: 2
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
