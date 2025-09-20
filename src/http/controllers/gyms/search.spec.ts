import request from "supertest"
import {app} from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Search Gym (e2e)", () => {

    beforeAll(async () =>{
      
        await app.ready()
    })

    afterAll( async () => {
        
        await app.close()
    })

    it("it should be able to search a gym", async () => {

        const {token} = await createAndAuthenticateUser(app, true)

        await request(app.server)
        .post("/gyms")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Javascript Gym",
            description: "Some description",
            phone: "1193242343",
             latitude: -23.5867473,
            longitude: -47.3234,
        })

        await request(app.server)
        .post("/gyms")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Typescript Gym",
            description: "Some description",
            phone: "1193242343",
             latitude: -22.5867473,
            longitude: -47.3234,
        })

        const response = await request(app.server)
        .get("/gyms/search")
        .query({
            q: "Javascript"
        })
        .set("Authorization", `Bearer ${token}`)
        .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
        expect.objectContaining({

            title: "Javascript Gym"
        })
    ])
})
})
