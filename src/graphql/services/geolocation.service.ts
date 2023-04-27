import BaseService from "./BaseService";

export default new BaseService({
    model: 'geolocation',
    includes: ['region', 'city', 'stopPoint']
})
