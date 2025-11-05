import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository.js";
import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";
import { CheckInService } from "./check-in.js";
import dayjs from "dayjs";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository.js";
import { Decimal } from "@prisma/client/runtime/binary";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.js";
import { MaxDistanceError } from "./errors/max-distance-error.js";

let checkInRepository: InMemoryCheckInsRepository;
let gymRepository: InMemoryGymRepository;
let checkInService: CheckInService;

describe("Check-in service", () => {
  // executa antes de cada um dos teste
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymRepository = new InMemoryGymRepository();
    checkInService = new CheckInService(checkInRepository, gymRepository);
    vi.useFakeTimers();

    await gymRepository.create({
      id: "gym-01",
      title: "gym-01",
      description: "",
      phone: "",
      latitude: 0,
      longitude: 0,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be able to check in different days", async () => {
    vi.setSystemTime(new Date(2025, 8, 11, 12, 0, 0));

    await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2025, 8, 12, 12, 0, 0));

    const { checkIn } = await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 8, 11, 12, 0, 0));

    await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() =>
      checkInService.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -19.9155097,
        userLongitude: -44.0695607,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should not be able to check in on distance gym", async () => {
    gymRepository.items.push({
      id: "gym-02",
      title: "JavaScriptGym",
      description: "",
      phone: "",
      latitude: new Decimal(-27.3347634),
      longitude: new Decimal(-49.3347634),
    });

    await expect(async () => {
      await checkInService.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -19.9155097,
        userLongitude: -44.0695607,
      });
    }).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
