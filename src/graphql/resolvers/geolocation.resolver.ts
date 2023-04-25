import {GraphQLResolveInfo} from "graphql/type";
import geolocationService from "../services/geolocation.service";

export const geolocationResolver = {
    Query: {
        async ['geolocations'](_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await geolocationService.getAll({info});
        },
        async geolocation(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await geolocationService.getById({id: args.id, info});
        }
    },
    Mutation: {
        async createGeolocation(){}
    }
}
