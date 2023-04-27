import {GraphQLResolveInfo} from "graphql/type";
import regionService from "../services/region.service";

export default {
    Query: {
        async regions(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await regionService.getAll({info});
        },
        async region(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await regionService.getById({id: args.id, info});
        }
    },
    Mutation: {}
}
