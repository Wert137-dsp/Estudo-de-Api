import {expect, describe, it, beforeEach} from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { GetUserProfileService } from "./get-user-profile"
import { ResourceNotFoundError } from "./errors/resource-not-found"


let userRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe("Get User Profile", () => {

    beforeEach(() => {
        userRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileService(userRepository)
    })

    it("should be able to get user profile", async () => {

        const createdUser = await userRepository.create({

            name: "Fulano",
            email: "fulano123@gmail.com",
            password_hash: await hash("123456", 6),
        })
        const {user} = await sut.execute({

           userId:createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual(expect.any(String))

    })

    it("should not be able to get user profile with wrond id", async () => {

        await expect(() => 

             sut.execute({
                userId:"non-existing-id"
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
       
    })

    
})