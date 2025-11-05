import { makeCheckInService } from "@/services/factories/make-check-in-service.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

const createCheckInParamsSchema = z.object({
  gymId: z.string().nonempty(),
});

const createCheckInBodySchema = z.object({
  userLatitude: z.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  userLongitude: z.number().refine((value) => {
    return Math.abs(value) <= 100;
  }),
});

export async function createCheckIn(req: FastifyRequest, reply: FastifyReply) {
  const {userLatitude, userLongitude } =
    createCheckInBodySchema.parse(req.body);
  const { gymId } = createCheckInParamsSchema.parse(req.params);
  
    const checkInService = makeCheckInService();
    const {checkIn} = await checkInService.execute({
      gymId,
      userId: req.user.sub,
      userLatitude,
      userLongitude,
    });
    reply.status(201).send({checkIn,});
  
}
