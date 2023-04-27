import {GraphQLResolveInfo} from "graphql/type";
import routeService from "../services/route.service";

export default {
    Query: {
        async routes(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await routeService.getAll({info});
        },
        async route(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await routeService.getById({id: args.id, info});
        }
    },
    Mutation: {
        async createRoute(){}
    }
}
