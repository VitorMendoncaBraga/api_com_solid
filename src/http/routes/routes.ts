import type { FastifyInstance } from "fastify";
import { register } from "../controllers/users/register.controller.js";
import { authenticate } from "../controllers/users/authenticate.controller.js";
import { profile } from "../controllers/users/profile.controller.js";
import { verifyJWT } from "../middlewares/verify-jwt.js";

export async function appRoutes(fastify: FastifyInstance){
    fastify.post("/users", register)
    fastify.post("/sessions", authenticate)
    // Authenticated routes
    fastify.get("/me", {onRequest: [verifyJWT]} , profile)
}