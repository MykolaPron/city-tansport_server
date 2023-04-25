import {GraphQLResolveInfo} from "graphql/type";
import {extractSelection} from "../utils/extractSelection";
import {PrismaClient} from "@prisma/client";

interface GetAllArgs {
    info: GraphQLResolveInfo
}

interface GetByIdArgs extends GetAllArgs {
    id: number
}

type BaseServicePropsTypes = {
    model: any,
    includes?: string[],
}

class BaseService {
    #model: any;
    #includes: string[];

    constructor(props: BaseServicePropsTypes) {
        const prisma = new PrismaClient()
        // @ts-ignore
        this.#model = prisma[props.model]
        this.#includes = props.includes ?? []
    }

    getAll({info}: GetAllArgs){
        return this.#model.findMany({
            include: this.#getIncludes(info)
        })
    }

    getById({id, info}: GetByIdArgs){
        return this.#model.findUnique({
            where: {id},
            // include: this.getIncludes(info)
        })
    }

    #getIncludes(info: GraphQLResolveInfo){
        let includes: any = false
        const extractedSelections = extractSelection(info)

        this.#includes.forEach((include) => {
            if(extractedSelections.includes(include)){
                if(!includes){
                    includes = {}
                }
                includes[include] = true
            }
        })

        return includes
    }
}

export default BaseService
