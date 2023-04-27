import BaseService from "./BaseService";

export default new BaseService({
    model: 'city',
    includes: ['geolocation', 'region']
})
