import BaseService from "./BaseService";

export default new BaseService({
    model: 'route',
    includes: ['city']
})
