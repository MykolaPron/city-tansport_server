import {GraphQLResolveInfo} from "graphql/type";
import cityService from "../services/city.service";

export default {
    Query: {
        async cities(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await cityService.getAll({info});
        },
        async city(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await cityService.getById({id: args.id, info});
        }
    },
    Mutation: {}
}
