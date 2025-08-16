import {expect, describe, it, beforeEach, afterEach, vi} from "vitest"
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsService } from "@/services/fetch-nearby-gyms"
import { title } from "process"

let gymRepository: InMemoryGymRepository
let sut: FetchNearbyGymsService

describe("Fetch Nearby Gyms Service", () => {

    beforeEach(() => {

        gymRepository = new InMemoryGymRepository()
        sut = new FetchNearbyGymsService(gymRepository)

    })

    it("should be able to fetch nearby gyms", async () => {

        await gymRepository.create({

            title: "Academia Nova Geração",
            description: null,
            phone: null,
            latitude: -23.582786,
            longitude: -46.4115,
            
            //-23.582786,-46.4115
        })

        await gymRepository.create({

            title: "Academia Agon Fitness",
            description: null,
            phone: null,
            latitude: -23.5845393,
            longitude: -46.4022111,

            //-23.5845393,-46.4022111
        })

        await gymRepository.create({

            title: "Academia Elort Fitness",
            description: null,
            phone: null,
            latitude: -23.5815275,
            longitude: -46.4065561,

            //-23.5815275,-46.4065561
        })

        await gymRepository.create({

            title: "Academia Gaviões 24h",
            description: null,
            phone: null,
            latitude: -23.5249002,
            longitude: -46.5787973,

            //-23.5815275,-46.4065561
        })
        
        const {gyms} = await sut.execute({

            userLatitude: -23.5867473,
            userLongitude: -46.3932911,
        })

        expect(gyms).toHaveLength(3)
        expect(gyms).toEqual([
            expect.objectContaining({title: "Academia Nova Geração"}),
            expect.objectContaining({title: "Academia Agon Fitness"}),
            expect.objectContaining({title: "Academia Elort Fitness"}),
        ])

    })
})