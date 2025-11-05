import { makeCreateGymService } from "@/services/factories/make-create-gym-service.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const createGymSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 100;
  }),
});

export async function createGym(req: FastifyRequest, reply: FastifyReply) {
  const { title, description, phone, latitude, longitude } =
    createGymSchema.parse(req.body);

  try {
    const createGymService = makeCreateGymService();
    const { gym } = await createGymService.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    });
    return reply.status(201).send({ gym });
  } catch (error) {
    throw error
  }
}
