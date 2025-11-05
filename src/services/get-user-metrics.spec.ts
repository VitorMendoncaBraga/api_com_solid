import type { ICheckInsRepository } from "@/repositories/check-ins-repository.js";
import { beforeAll, describe, expect, it } from "vitest";
import { GetUserMetricsService } from "./get-user-metrics.js";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository.js";

let checkInRepository: ICheckInsRepository;
let getUserMetricsService: GetUserMetricsService;

describe("Get user metrics service", () => {
  beforeAll(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    getUserMetricsService = new GetUserMetricsService(checkInRepository);
  });

  it("should be able to get check-ins count", async () => {
    for (let i = 1; i <= 10; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }
    const {checkInsCount} = await getUserMetricsService.execute({
        userId: "user-01"
    })
    expect(checkInsCount).toEqual(10)
  });
});
