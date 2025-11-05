import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app.js";
import { describe } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.js";

describe("Search Gym (e2e)", () => {
  beforeAll(async () => {
    // espera todo o fastify terminar de inicializar
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gym", async () => {
    const { token } = await createAndAuthenticateUser(app);
    console.log(token);

    await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: -23.5489,
        longitude: -46.6388,
      });

    await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: -23.5489,
        longitude: -46.6388,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "JavaScript",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });
});
