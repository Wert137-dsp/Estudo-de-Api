import {expect, describe, it, beforeEach} from "vitest"
import { CreateGymService } from "./create-gym"
import { InMemoryGymRepository} from "@/repositories/in-memory/in-memory-gyms-repository"

let gymsRepository: InMemoryGymRepository
let sut: CreateGymService

describe("Create Gym Service", () => {

    beforeEach(() => {

        gymsRepository = new InMemoryGymRepository()
        sut = new CreateGymService(gymsRepository)
    })

    it.only("should be able to create gyms", async () => {

        const {gym} = await sut.execute({

            title: "Academia Nova Geração",
            description: null,
            phone: null,
            latitude: -23.5867473,
            longitude: -47.3234,
        })

        expect(gym.id).toEqual(expect.any(String))

    })

})