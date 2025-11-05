import fastify from "fastify";
import { register } from "./http/controllers/users/register.controller.js";
import { appRoutes } from "./http/routes/routes.js";
import { ZodError } from "zod";
import { env } from "./env/index.js";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "./http/routes/users.js";
import { gymRoutes } from "./http/routes/gyms.js";
import { checkInRoutes } from "./http/routes/check-ins.js";
import fastifyCookie from "@fastify/cookie";



export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '10m' // access token
    },
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    }
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(checkInRoutes)
app.register(gymRoutes, {
    prefix: "/gyms"
})

//  Lida com os error de forma mais interessante

app.setErrorHandler((error, request, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({message: "Validade error.", issues: error.format()})
    }

    // Em ambiente de desenvolvimento mostra no console o error!

    if(env.NODE_ENV != 'production'){
        console.error(error)
    }
    else{
        // Log para uma ferramenta externa
    }

    return reply.status(500).send({message: "Internal server error"})
})