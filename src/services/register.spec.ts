import {test, expect, describe, it, beforeEach} from "vitest"
import { RegisterService } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists"

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe("Register Service", () => {

    beforeEach(() => {

        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterService(usersRepository)
    })

    it("should be able to register", async () => {

        const {user} = await sut.execute({

            name: "Fulano",
            email: "fulano123@gmail.com",
            password: "123456",
        })

        expect(user.id).toEqual(expect.any(String))

    }),

    it("should hash user password upon registration", async () => {

        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const sut = new RegisterService(inMemoryUsersRepository)

        const {user} = await sut.execute({

            name: "Fulano",
            email: "fulano123@gmail.com",
            password: "123456",
        })

        const isPasswordCorrectMashed = await compare("123456", user.password_hash)

        expect(isPasswordCorrectMashed).toBe(true)

        console.log(user.password_hash)
    }),

    it("should not be able to register with same email twice", async () => {

        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const sut = new RegisterService(inMemoryUsersRepository)

        const email = "fulano123@gmail.com"

        await sut.execute({

            name: "Fulano",
            email,
            password: "123456",
        })

        await expect(() => 
            sut.execute({

                name: "Fulano",
                email,
                password: "123456",
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})