import accountService from "../services/account.service";
import {comparePasswords} from "../../utils/CryptoHelper";
import {GraphQLResolveInfo} from "graphql/type";

export default {
    Query: {
        async accounts(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            console.log(context)

            return await accountService.getAll({info});
        },
        async account(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await accountService.getById({id: args.id, info});
        }
    },

    Mutation: {
        async login(_: any, args: Record<string, any>, context: string, info: GraphQLResolveInfo){

            return null
        },
        async validateAccount(_: any, args: Record<string, any>) {
            const {username, password} = args.input

            const user = await accountService.getByUsername(username)
            if(!user){
                return null
            }
            const comp = await comparePasswords(password, user.password)

            return comp ? user : null;
        },
    }
}
