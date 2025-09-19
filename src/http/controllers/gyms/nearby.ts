import { FastifyRequest, FastifyReply } from "fastify"
import {z} from "zod"
import { makeFetchNearbyService } from "@/services/factories/make-fetch-nearby-gyms"

export async function nearby(req:FastifyRequest, res:FastifyReply) {

    const nearbyGymsQuerySchema = z.object({
        latitude: z.number().refine( value => {
            return Math.abs(value) <= 90
       }),
       longitude: z.number().refine( value => {
            return Math.abs(value) <= 90
       })
    })

    const {latitude, longitude} = 
    nearbyGymsQuerySchema.parse(req.query)

        const nearbyGymsService = makeFetchNearbyService()

        const {gyms} =await nearbyGymsService.execute({
           userLatitude: latitude,
           userLongitude: longitude,

        })

    return res.status(201).send({

        gyms,
    })
}