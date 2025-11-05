import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from 'supertest'
import {app} from '@/app.js'
import { describe } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.js";

describe("Nearby Gym (e2e)", () => {

    beforeAll(async () => {
        // espera todo o fastify terminar de inicializar
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to list nearby gyms ", async () => {

        const { token } = await createAndAuthenticateUser(app)
       

        await request(app.server).post("/gyms/create").set("Authorization", `Bearer ${token}`).send({
            title: "JavaScript Gym",
            description: "Some description",
            phone: "11999999999",
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        await request(app.server).post("/gyms/create").set("Authorization", `Bearer ${token}`).send({
            title: "TypeScript Gym",
            description: "Some description",
            phone: "11999999999",
            latitude: -27.0610928,
            longitude: -49.5229501,
        })

        const response = await request(app.server).get("/gyms/nearby").query({
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        }).set("Authorization", `Bearer ${token}`).send()
        

        expect(response.statusCode).toEqual(200);
    })
})