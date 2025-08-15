import {expect, describe, it, beforeEach, afterEach, vi} from "vitest"
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { SearchGymService } from "./search-gyms"
import { title } from "process"

let gymRepository: InMemoryGymRepository
let sut: SearchGymService

describe("Search Gyms Service", () => {

    beforeEach(() => {

        gymRepository = new InMemoryGymRepository()
        sut = new SearchGymService(gymRepository)

    })

    it("should be able to search form gyms", async () => {

        await gymRepository.create({

            title: "Academia Nova Geração",
            description: null,
            phone: null,
            latitude: -23.5867473,
            longitude: -47.3234,
        })

        await gymRepository.create({

            title: "Academia Bem Estar",
            description: null,
            phone: null,
            latitude: -20.5867473,
            longitude: -34.3234,
        })

        const {gyms} = await sut.execute({

            query: "Nova Geração",
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title: "Academia Nova Geração"}),
        ])

    })

    it("should be able to fetch paginated gyms search", async () => {

       for (let i = 1; i <= 22; i++) {

        await gymRepository.create({

            title: `Academia Nova Geração ${i}`,
            description: null,
            phone: null,
            latitude: -23.5867473,
            longitude: -47.3234,
        })
       }

        const {gyms} = await sut.execute({

           query: "Nova Geração",
           page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title: "Academia Nova Geração 21"}),
            expect.objectContaining({title: "Academia Nova Geração 22"})
        ])

    })
})