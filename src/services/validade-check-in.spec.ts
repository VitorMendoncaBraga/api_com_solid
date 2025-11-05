import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository.js";
import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";
import { ValidadeCheckInService } from "./validade-check-in.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.js";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error.js";

let checkInRepository: InMemoryCheckInsRepository;
let validateCheckIn: ValidadeCheckInService;

describe("Validate check-in service", () => {
  // executa antes de cada um dos teste
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    validateCheckIn = new ValidadeCheckInService(checkInRepository);
    vi.useFakeTimers()
  });

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to validate check-in", async () => {
    const checkInToValidate = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const checkInId = checkInToValidate.id;

    const { checkIn } = await validateCheckIn.execute({ checkInId });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(async () => {
      await validateCheckIn.execute({
        checkInId: "inexistent-check-in",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate a check-in when passed more than 20 minutes", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 12, 0, 0))
    const {id} = await checkInRepository.create({
        gym_id: "gym-01",
        user_id: "user-01"
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    
    await expect(async () => {
        await validateCheckIn.execute({checkInId: id})
    }).rejects.toBeInstanceOf(LateCheckInValidationError)

  })
});
