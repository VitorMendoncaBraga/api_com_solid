import type { CheckIn } from "@/generated/prisma/index.js";
import type { ICheckInsRepository } from "@/repositories/check-ins-repository.js";

interface IFetchUserCheckInsHistoryServiceRequest {
  userId: string,
  page: number
}

interface IFetchUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryService {
  private checkInRepository: ICheckInsRepository;


  constructor(checkInRepository: ICheckInsRepository){
    this.checkInRepository = checkInRepository
  }

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryServiceRequest): Promise<IFetchUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)
    return {checkIns}
  }
}
