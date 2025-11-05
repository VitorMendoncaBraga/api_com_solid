import type { CheckIn } from "@/generated/prisma/index.js";
import type { ICheckInsRepository } from "@/repositories/check-ins-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.js";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error.js";

interface IValidadeCheckInServiceRequest{
    checkInId: string
}

interface IValidadeCheckInServiceResponse{
    checkIn: CheckIn 
}

export class ValidadeCheckInService {
 private checkInRepository: ICheckInsRepository

 constructor(checkInRepository: ICheckInsRepository){
    this.checkInRepository = checkInRepository
 }

 async execute({checkInId}: IValidadeCheckInServiceRequest): Promise<IValidadeCheckInServiceResponse>{
    const checkIn = await this.checkInRepository.findById(checkInId)

    if(!checkIn){
        throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, "minutes")

    if(distanceInMinutesFromCheckInCreation > 20){
        throw new LateCheckInValidationError()
    }
    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
        checkIn,
    }

 }
}