import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from 'supertest'
import {app} from '@/app.js'
import { describe } from "vitest";

describe("Register (e2e)", () => {

    beforeAll(async () => {
        // espera todo o fastify terminar de inicializar
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to register", async () => {
        const response = await request(app.server).post("/register").send({
            name: "John Doe2",
            email: "johndoe2@example.com",
            password: "123456"
        })
        

        expect(response.statusCode).toEqual(201)
    })
})