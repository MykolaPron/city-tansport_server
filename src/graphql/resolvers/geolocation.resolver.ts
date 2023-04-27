import {GraphQLResolveInfo} from "graphql/type";
import geolocationService from "../services/geolocation.service";

interface Geolocation{
    latitude: number,
    longitude: number
}
export default {
    Query: {
        async geolocations(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await geolocationService.getAll({info});
        },
        async geolocation(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await geolocationService.getById({id: args.id, info});
        }
    },
    Mutation: {
        async createGeolocation(_: any, {input}: Record<string, any>, ){
            return await geolocationService.create<Geolocation>({
                latitude: input.latitude,
                longitude: input.longitude
            })
        },

        async deleteGeolocation(_: any, {id}: Record<string, any>){
            return await geolocationService.deleteById(id)
        }
    }
}
