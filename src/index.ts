import express, {Express, Request, Response, NextFunction} from 'express'
import dotenv from 'dotenv'
import cors from "cors"

import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {resolvers, typeDefs} from "./graphql";
import path from "path";

dotenv.config()

const app: Express = express()
const port = process.env.PORT

const bootstrapServer = async () => {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })
    await server.start()

    app.use("/graphql", expressMiddleware(server, {
        context: async ({ req }) => {
            // const token = req.headers.authorization || '';
            // console.log(req.headers.token)
            return ({ token: 'req.headers.token' })
        },
    }))

    app.use('*', express.static(path.join(__dirname, 'public')));

    // app.get('*', (req: Request, res: Response, next: NextFunction) => {
    //     res.json('Hello')
    // })

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
        console.log(`⚡️[server]: GraphQl is running at http://localhost:${port}/graphql`)
    });
}

bootstrapServer()
