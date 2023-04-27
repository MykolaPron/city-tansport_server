import {GraphQLResolveInfo} from "graphql/type";
import stopPointService from "../services/stopPoint.service";

export default {
    Query: {
        async stopPoints(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await stopPointService.getAll({info});
        },
        async stopPoint(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await stopPointService.getById({id: args.id, info});
        }
    },
    Mutation: {
        async createStopPoint() {}
    }
}
