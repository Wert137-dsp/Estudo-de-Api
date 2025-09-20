import "@fastify/jwt"

declare module "@fastify/jwt" {
  export interface FastifyJWT {
     // payload type is used for signing and verifying
    payload: {

      
    }
    user: {
      role: "ADMIN" | "MEMBER"
      sub: string
    } // user type is return type of `request.user` object
  }
}