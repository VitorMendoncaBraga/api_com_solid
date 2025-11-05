import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt.js";
import { createGym } from "../controllers/gyms/create-gym.controller.js";
import { searchGyms } from "../controllers/gyms/search-gyms.controller.js";
import { nearbyGyms } from "../controllers/gyms/nearby-gyms.controller.js";
import { verifyUserRole } from "../middlewares/verify-user-role.js";

export function gymRoutes(fastify: FastifyInstance){
    fastify.addHook("onRequest", verifyJWT)
    fastify.post("/create", {onRequest: [verifyUserRole]} , createGym)
    fastify.get("/search" ,searchGyms)
    fastify.get("/nearby" ,nearbyGyms)
}