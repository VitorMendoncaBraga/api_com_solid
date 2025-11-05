import type { FastifyInstance } from "fastify";
import { createGym } from "../controllers/gyms/create-gym.controller.js";
import { searchGyms } from "../controllers/gyms/search-gyms.controller.js";
import { nearbyGyms } from "../controllers/gyms/nearby-gyms.controller.js";
import { userMetrics } from "../controllers/check-ins/metrics-check-ins.controller.js";
import { getUserCheckInsHistory } from "../controllers/check-ins/history-check-ins.controller.js";
import { validateCheckIn } from "../controllers/check-ins/validate-check-ins.controller.js";
import { createCheckIn } from "../controllers/check-ins/create-check-in.controller.js";
import { verifyJWT } from "../middlewares/verify-jwt.js";

export function checkInRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", verifyJWT);
  fastify.patch("/check-ins/:checkInId/validate", validateCheckIn);
  fastify.get("/check-ins/metrics", userMetrics);
  fastify.post("/check-ins/:gymId/create", createCheckIn);
  fastify.get("/check-ins/history", getUserCheckInsHistory);
}
