import type { Prisma, CheckIn } from "@/generated/prisma/index.js";
import type { ICheckInsRepository } from "../check-ins-repository.js";
import { prisma } from "@/lib/prisma.js";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    // como created_at não é unique, n podemos utilizar o findUnique
    const checkIn = await prisma.checkIn.findFirst({
        where: {
            user_id: userId,
            created_at: {
                gte: startOfTheDay.toDate(),
                lte: endOfTheDay.toDate()
            }
        }
    })

    return checkIn
  }
  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },

      //offset
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }
  async findById(Id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: Id,
      },
    });

    return checkIn;
  }
  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }
  async save(checkIn: CheckIn): Promise<CheckIn> {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });

    return updatedCheckIn;
  }
}
