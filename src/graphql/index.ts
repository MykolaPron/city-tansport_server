import {getTypeDef} from "./utils/getTypeDef";
import {reduceResolvers} from "./utils/reduceResolvers";

import accountResolver from "./resolvers/account.resolver";
import regionResolver from "./resolvers/region.resolver";
import cityResolver from "./resolvers/city.resolver";
import stopPointResolver from "./resolvers/stopPoint.resolver";
import geolocationResolver from "./resolvers/geolocation.resolver";
import routeResolver from "./resolvers/route.resolver";

export const typeDefs = [
    'account',
    'geolocation',
    'region',
    'city',
    'stopPoint',
    'route',
].map(getTypeDef).join('')

export const resolvers = reduceResolvers([
    accountResolver,
    geolocationResolver,
    regionResolver,
    cityResolver,
    stopPointResolver,
    routeResolver,
])
