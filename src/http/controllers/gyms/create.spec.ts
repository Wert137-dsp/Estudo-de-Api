import request from "supertest"
import {app} from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Create Gym (e2e)", () => {

    beforeAll(async () =>{
      
        await app.ready()
    })

    afterAll( async () => {
        
        await app.close()
    })

    it("it should be able to create a gym", async () => {


        const {token} = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
        .post("/gyms")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Javascript Gym",
            description: "Some description",
            phone: "1193242343",
             latitude: -23.5867473,
            longitude: -47.3234,
        })

        expect(response.statusCode).toEqual(201)
    })
})
