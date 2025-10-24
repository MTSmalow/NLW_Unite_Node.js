import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from './generated/prisma'

const app = fastify()

const prisma = new PrismaClient({
    log:['query'],
})

//metodos http: get, post, put, patch, delete

//Parametros :
//query:  http://localhost:3333/users?search=eduardo (filtros, paginação, ordenação)
//route: http://localhost:3333/users/1 (identificar um recurso)
//body: corpo da requisição (json, xml) - usado para criar ou alterar um recurso
//Cabeçalhos: metadados da requisição (autenticação, controle de cache)

//Tipos de parametros:
//Query Params: request.query
//Route Params: request.params
//Body: request.body

//semanticas = significado

//driver nativo, query builder, ORM

// object relational mapping (Prisma, Sequelize, TypeORM)

//JSON - JavaScript Object Notation

app.post("/events", async(request, reply) => {
    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
    })

    const dta = createEventSchema.parse(request.body)

    const event = await prisma.event.create({
        data: {
            title: dta.title,
            details: dta.details,
            maximumAttendees: dta.maximumAttendees,
            slug: new Date().toISOString(),
        }})

    // return {eventId: event.id}
    return reply.status(201).send(event)
})

app.listen({port:3333 }).then(() => {
    console.log("hello word http")
})