import { makeGetUserMetricsService } from "@/services/factories/make-get-user-metrics-service.js";

import type { FastifyReply, FastifyRequest } from "fastify";

export async function userMetrics(req: FastifyRequest, reply: FastifyReply) {
  const metricsService = makeGetUserMetricsService();
  const { checkInsCount } = await metricsService.execute({
    userId: req.user.sub,
  });
  return reply.status(200).send({
    checkInsCount,
  });
}
