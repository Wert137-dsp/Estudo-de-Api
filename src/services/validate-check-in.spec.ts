import {expect, describe, it, beforeEach, afterEach, vi} from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { ValidateCheckInService} from "@/services/validate-check-in"
import { ResourceNotFoundError } from "./errors/resource-not-found"

let checkInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe("Validate Check-in Service", () => {

    beforeEach(() => {

        checkInRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInService(checkInRepository)

        // vi.useFakeTimers()
    })

    afterEach(() => {

        // vi.useRealTimers()
    })

    it("should be able to validate the check in", async () => {

        const createdCheckIn = await checkInRepository.create({

            gym_id: "gym-01",
            user_id: "user-01",
        })

        const {checkIn} = await sut.execute({

            checkInId: createdCheckIn.id
    
        })
        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it("should be able to validate the an a inexistent check in", async () => {


        await expect( () => sut.execute({

            checkInId: "inexistent-check-id"
    
        })).rejects.instanceOf(ResourceNotFoundError)
       
    })


    
})