import type { CheckIn } from "@/generated/prisma/index.js";
import type { ICheckInsRepository } from "@/repositories/check-ins-repository.js";
import type { IGymRepository } from "@/repositories/gyms-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.js";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordenates.js";
import { MaxDistanceError } from "./errors/max-distance-error.js";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.js";

interface ICheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface ICheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  private checkInRepository: ICheckInsRepository;
  private gymRepository: IGymRepository;

  constructor(
    checkInRepository: ICheckInsRepository,
    gymRepository: IGymRepository
  ) {
    (this.checkInRepository = checkInRepository),
      (this.gymRepository = gymRepository);
  }

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: ICheckInServiceRequest): Promise<ICheckInServiceResponse> {
    const gym = await this.gymRepository.findById(gymId);
    const checkOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    if (checkOnSameDate) {
      throw new MaxNumberOfCheckInsError();
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE_KILOMETERS = 0.1

    if(distance > MAX_DISTANCE_KILOMETERS){
        throw new MaxDistanceError
    }

    // calculate distance between user and gym

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
