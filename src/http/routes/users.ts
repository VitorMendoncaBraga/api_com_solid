import type { FastifyInstance } from "fastify";
import { register } from "../controllers/users/register.controller.js";
import { authenticate } from "../controllers/users/authenticate.controller.js";
import { profile } from "../controllers/users/profile.controller.js";
import { verifyJWT } from "../middlewares/verify-jwt.js";
import { refresh } from "../controllers/users/refresh.controller.js";

export function userRoutes(fastify: FastifyInstance){
    fastify.post("/register", register),
    fastify.post("/sessions", authenticate)
    fastify.get("/me", {onRequest: [verifyJWT]} , profile)
    fastify.patch("/token/refresh", refresh)
    
}