import { FastifyRequest, FastifyReply } from "fastify"
import {z} from "zod"
import { makeValidateCheckInsService } from "@/services/factories/make-validate-check-ins-service"

export async function validate(req:FastifyRequest, res:FastifyReply) {

    const createCheckInParamsSchema = z.object({

       checkInId: z.string().uuid()
    })


    const {checkInId} = createCheckInParamsSchema.parse(req.params)
        const validateCheckInService = makeValidateCheckInsService()

        await validateCheckInService.execute({
          checkInId
        })

    return res.status(204).send()
}