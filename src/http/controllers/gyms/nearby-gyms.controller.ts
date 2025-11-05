import { makeCreateGymService } from "@/services/factories/make-create-gym-service.js";
import { makeFetchNearbyGymsService } from "@/services/factories/make-fetch-nearby-gyms.js";
import { makeSerchGymsService } from "@/services/factories/make-search-gym-service.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const nearbyGymQuerySchema = z.object({
  userLatitude: z.coerce.number().refine(value => {
    return Math.abs(value) <= 90
  }),
  userLongitude: z.coerce.number().refine(value => {
    return Math.abs(value) <= 180
  }),
});

export async function nearbyGyms(req: FastifyRequest, reply: FastifyReply) {
  const { userLatitude, userLongitude } =
    nearbyGymQuerySchema.parse(req.query)
 
    const nearbyGymService = makeFetchNearbyGymsService();
    const {gyms} = await nearbyGymService.execute({
     userLatitude,
     userLongitude
    });
    return reply.status(200).send({
        gyms,
    });
  
}