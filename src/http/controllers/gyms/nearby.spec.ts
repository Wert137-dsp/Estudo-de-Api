import request from "supertest"
import {app} from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Nearby Gym (e2e)", () => {

    beforeAll(async () =>{
      
        await app.ready()
    })

    afterAll( async () => {
        
        await app.close()
    })

    it("it should be able to list nearby gym", async () => {

        const {token} = await createAndAuthenticateUser(app)

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Academia Nova Geração",
                description: null,
                phone: null,
                latitude: -23.582786,
                longitude: -46.4115,
            })

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Academia Agon Fitness",
                description: null,
                phone: null,
                latitude: -23.5845393,
                longitude: -46.4022111,
            })

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Academia Elort Fitness",
                description: null,
                phone: null,
                latitude: -23.5815275,
                longitude: -46.4065561,
            })

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Academia Gaviões 24h",
                description: null,
                phone: null,
                latitude: -23.5249002,
                longitude: -46.5787973,
            })

        const response = await request(app.server)
        .get("/gyms/nearby")
        .query({
            latitude: -23.5867473,
            longitude: -46.3932911,
        })
        .set("Authorization", `Bearer ${token}`)
        .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(3)
    expect(response.body.gyms).toEqual([
        expect.objectContaining({title: "Academia Nova Geração"}),
        expect.objectContaining({title: "Academia Agon Fitness"}),
        expect.objectContaining({title: "Academia Elort Fitness"}),
    ])
})
})
