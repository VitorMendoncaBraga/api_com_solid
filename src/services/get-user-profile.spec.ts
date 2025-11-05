import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileService } from "./get-user-profile.js";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found.js";

let userRepository: InMemoryUserRepository;
let getUserProfile: GetUserProfileService;

describe("Get user profile service", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    getUserProfile = new GetUserProfileService(userRepository);
  });

  it("should find user by id", async () => {
    const createdUser = await userRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const user = await getUserProfile.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to get user profile with wrong id", async () => {
    const createdUser = await userRepository.create({
      email: "johndoe@example.com",
      name: "John Doe",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      getUserProfile.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
