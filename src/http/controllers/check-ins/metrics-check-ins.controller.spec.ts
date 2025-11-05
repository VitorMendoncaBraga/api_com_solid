import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.js";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.js";

describe("Get History Check-ins (e2e)", () => {
  beforeAll(async () => {
    // espera todo o fastify terminar de inicializar
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to get user metrics", async () => {
    const { token } = await createAndAuthenticateUser(app);
    

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
      

     await request(app.server).post(`/check-ins/${gymId}/create`).set("Authorization", `Bearer ${token}`).send({
      userLatitude: -23.5489,
      userLongitude: -46.6388,
    });

    const response = await request(app.server).get("/check-ins/metrics").set("Authorization", `Bearer ${token}`).send();

    expect(response.statusCode).toEqual(200);
  });
});
