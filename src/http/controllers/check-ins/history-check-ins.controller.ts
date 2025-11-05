import { makeCreateGymService } from "@/services/factories/make-create-gym-service.js";
import { makeFetchUserCheckInsHistoryService } from "@/services/factories/make-fetch-user-check-ins-history-service.js";
import { makeSerchGymsService } from "@/services/factories/make-search-gym-service.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const checkInHistoryQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
});

export async function getUserCheckInsHistory(req: FastifyRequest, reply: FastifyReply) {
  const { page } = checkInHistoryQuerySchema.parse(req.query);

  const checkInsHistoryService = makeFetchUserCheckInsHistoryService();
  const { checkIns } = await checkInsHistoryService.execute({
    userId: req.user.sub,
    page,
  });
  return reply.status(200).send({
    checkIns,
  });
}
