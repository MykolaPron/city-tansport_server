import BaseService from "./BaseService";


const geolocationService = new BaseService({
    model: 'geolocation',
    includes:['region']
})

export default geolocationService
