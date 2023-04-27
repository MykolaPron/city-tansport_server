import BaseService from "./BaseService";

class AccountService extends BaseService {
    getByUsername(username: string){
        return this.model.findUnique({
            where: {username}
        })
    }
}

export default new AccountService({
    model: 'account',
    includes: []
})
