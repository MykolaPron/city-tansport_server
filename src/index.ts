import express, {Express, Request, Response, NextFunction} from 'express'
import dotenv from 'dotenv'
import cors from "cors"

import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {resolvers, typeDefs} from "./graphql";

dotenv.config()

const app: Express = express()
const port = process.env.PORT

const bootstrapServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    await server.start()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use("/graphql", expressMiddleware(server))

    app.get('/', (req:Request, res: Response, next: NextFunction)=>{
        res.json('Hello')
    })

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
        console.log(`⚡️[server]: GraphQl is running at http://localhost:${port}/graphql`)
    });
}

bootstrapServer()
