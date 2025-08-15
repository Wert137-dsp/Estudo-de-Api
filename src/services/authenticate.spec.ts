import {expect, describe, it, beforeEach} from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { AuthenticateService } from "./authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"


let userRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe("Authenticate Service", () => {

    beforeEach(() => {
        userRepository = new InMemoryUsersRepository()
        sut = new AuthenticateService(userRepository)
    })

    it("should be able to authenticate", async () => {

        await userRepository.create({

            name: "Fulano",
            email: "fulano123@gmail.com",
            password_hash: await hash("123456", 6),
        })
        const {user} = await sut.execute({

            email: "fulano123@gmail.com",
            password: "123456",
        })

        expect(user.id).toEqual(expect.any(String))

    })

    it("should be able to authenticate with wrong email", async () => {

        await expect(() => 
            sut.execute({
            email: "fulano123@gmail.com",
            password: "123456",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it("should be able to authenticate with wrong passoword", async () => {

         await userRepository.create({

            name: "Fulano",
            email: "fulano123@gmail.com",
            password_hash: await hash("123456", 6),
        })

        await expect(() => 
            sut.execute({
            email: "fulano123@gmail.com",
            password: "123123",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})