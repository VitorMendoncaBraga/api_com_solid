import type { CheckIn, Prisma, User } from "@/generated/prisma/index.js";
import type { CreateUserSchema } from "../prisma/prisma-users-repository.js";
import type { IUsersRepository } from "../users-repository.js";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found.js";
import type { ICheckInsRepository } from "../check-ins-repository.js";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date() : null,
    };

    await this.items.push(checkIn);
    return checkIn;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");
    const checkOnSameDate = await this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
      return checkIn.user_id == userId && isOnSameDate;
    });
    if (!checkOnSameDate) {
      return null;
    }

    return checkOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    // calculo para pegar os indeces do array com paginação
    return this.items.filter((checkIn) => checkIn.user_id == userId).slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string){
     return this.items.filter(checkIn => checkIn.user_id == userId).length
  }

  async findById(Id: string) {
    const checkIn = this.items.find((checkIn) => checkIn.id == Id)
    if(!checkIn){
      return null
    }

    return checkIn
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = await this.items.findIndex(index => index.id == checkIn.id)
    if(checkInIndex >= 0){
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}
