import BaseService from "./BaseService";

const regionService = new BaseService({
    model: 'region',
    includes:['geolocation']
})

export default regionService
