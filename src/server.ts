import fastify from "fastify";
import { serializerCompiler, validatorCompiler} from "fastify-type-provider-zod"
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);

app.listen({port:3333 }).then(() => {
    console.log("hello word http")
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

//Códigos de status HTTP:
//20x0 - sucesso
//40x0 - erro do cliente
//50x0 - erro do servidor
