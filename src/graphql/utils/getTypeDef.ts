import {readFileSync} from "fs";
import path from "path";

export const getTypeDef = (name: string) => {
    const url = path.join(__dirname, `../typeDefs/${name}.graphql`)

    return readFileSync(url, {encoding: "utf-8"})
}
