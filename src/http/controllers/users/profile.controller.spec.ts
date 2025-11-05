import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from 'supertest'
import {app} from '@/app.js'
import { describe } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.js";

describe("Authenticate (e2e)", () => {

    beforeAll(async () => {
        // espera todo o fastify terminar de inicializar
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to get user profile", async () => {
        

        const {token} = await createAndAuthenticateUser(app)

        const response = await request(app.server).get("/me").set("Authorization", `Bearer ${token}`).send()


        expect(response.statusCode).toEqual(200);
        expect(response.body.userWithoutPassword).toEqual(expect.objectContaining({
            email: expect.any(String)
        }))
    })
})