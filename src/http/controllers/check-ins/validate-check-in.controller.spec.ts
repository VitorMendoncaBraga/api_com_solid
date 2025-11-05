import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.js";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.js";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    // espera todo o fastify terminar de inicializar
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to create check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);
    console.log(token);

    const createGymResponse = await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({

        title: "JavaScript Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: -23.5489,
        longitude: -46.6388,
      });

      const gymId = createGymResponse.body.gym.id;
      console.log(gymId)

     const createCheckInResponse = await request(app.server).post(`/check-ins/${gymId}/create`).set("Authorization", `Bearer ${token}`).send({
      userLatitude: -23.5489,
      userLongitude: -46.6388,
    });

    const { id } = createCheckInResponse.body.checkIn

    const response = await request(app.server).patch(`/check-ins/${id}/validate`).set("Authorization", `Bearer ${token}`).send();

    expect(response.statusCode).toEqual(200);
  });
});
