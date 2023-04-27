import BaseService from "./BaseService";

export default new BaseService({
    model: 'region',
    includes: ['geolocation', 'city']
})
