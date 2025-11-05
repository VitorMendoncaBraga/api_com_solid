import type { ICheckInsRepository } from "@/repositories/check-ins-repository.js";

interface IGetUserMetricsServiceRequest{
    userId: string
}

interface IGetUserMetricsServiceResponse{
    checkInsCount: number
}

export class GetUserMetricsService{
    private checkInsRepository: ICheckInsRepository
    constructor(checkInsRepository: ICheckInsRepository){
        this.checkInsRepository = checkInsRepository
    }

    async execute({userId}: IGetUserMetricsServiceRequest): Promise<IGetUserMetricsServiceResponse>{
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)
        return {
            checkInsCount,
        }
    }
}