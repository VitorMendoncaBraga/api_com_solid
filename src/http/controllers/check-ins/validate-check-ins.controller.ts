import { makeCheckInService } from "@/services/factories/make-check-in-service.js";
import { makeValidateService } from "@/services/factories/make-validate-check-in-service.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import z, { check } from "zod";

const validateCheckInParamsSchema = z.object({
  checkInId: z.uuid().nonempty(),
});

export async function validateCheckIn(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { checkInId } = validateCheckInParamsSchema.parse(req.params);

  const validadeCheckInService = makeValidateService();
  const { checkIn } = await validadeCheckInService.execute({
    checkInId,
  });
  reply.status(200).send({ checkIn });
}
