import {readFileSync} from "fs";
import path from "path";
import {regionResolver} from "./resolvers/region.resolver";
import {geolocationResolver} from "./resolvers/geolocation.resolver";

export const geolocationTypes = readFileSync(
    path.join(__dirname, "./typeDefs/geolocation.graphql"),
    {
        encoding: "utf-8"
    })
export const regionTypes = readFileSync(
    path.join(__dirname, "./typeDefs/region.graphql"),
    {
        encoding: "utf-8"
    })


export const typeDefs = `
    ${geolocationTypes},
    ${regionTypes},
`

export const resolvers = {
    Query: {
        ...geolocationResolver.Query,
        ...regionResolver.Query,
    },
    Mutation: {
        ...regionResolver.Mutation,
    }
}
