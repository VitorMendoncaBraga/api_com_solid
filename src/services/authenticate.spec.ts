import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository.js";
import { it, describe, expect, beforeEach } from "vitest";
import { AuthenticateService } from "./authenticate.js";
import { RegisterService } from "./register.js";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";

let usersRepository: InMemoryUserRepository;
let authenticateService: AuthenticateService;

describe("Authenticate service", () => {
  // executa antes de cada um dos teste
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    authenticateService = new AuthenticateService(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("1234", 6),
    });

    const {user} = await authenticateService.execute({
      email: "johndoe@example.com",
      password: "1234",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("1234", 6),
    });

    await expect(() =>
      authenticateService.execute({
        email: "johndoe@exampl.com",
        password: "1234",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("1234", 6),
    });

    await expect(() =>
      authenticateService.execute({
        email: "johndoe@example.com",
        password: "124",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
