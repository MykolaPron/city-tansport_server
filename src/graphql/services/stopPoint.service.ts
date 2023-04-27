import BaseService from "./BaseService";

export default new BaseService({
    model: 'stopPoint',
    includes: ['geolocation', 'city']
})
