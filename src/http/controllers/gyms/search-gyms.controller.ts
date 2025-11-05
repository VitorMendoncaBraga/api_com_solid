import { makeCreateGymService } from "@/services/factories/make-create-gym-service.js";
import { makeSerchGymsService } from "@/services/factories/make-search-gym-service.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const searchGymQuerySchema = z.object({
  query: z.string(),
  page: z.coerce.number().min(1).default(1),
});

export async function searchGyms(req: FastifyRequest, reply: FastifyReply) {
  const { page,query } =
    searchGymQuerySchema.parse(req.query)
 
    const searchGymService = makeSerchGymsService();
    const {gyms} = await searchGymService.execute({
      query,
      page
    });
    return reply.status(200).send({
        gyms,
    });
  
}