import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error.js";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

const authenticateRequestBodySchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = authenticateRequestBodySchema.parse(req.body);

    const authenticateService = makeAuthenticateService();

    const { user } = await authenticateService.execute({ email, password });

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/", // rotas do backend que vao ter acesso ao cookie, no caso, todas
        secure: true, //HTTPS
        sameSite: true, // somente no mesmo dominio
        httpOnly: true, // somente acessado em requisicoes, ou seja, somente pelo pelo back-end
      })
      .status(200)
      .send({ token });
  } catch (err: any) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(400).send({ error: err.message });
    }
  }
}
