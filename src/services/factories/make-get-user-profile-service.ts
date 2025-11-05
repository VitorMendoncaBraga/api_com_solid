import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { GetUserProfileService } from "../get-user-profile.js";

export function makeGetUserProfileServiceService(){
    const userRepository = new PrismaUsersRepository()
    const GetUserProfileServiceService = new GetUserProfileService(userRepository)
    return GetUserProfileServiceService
}