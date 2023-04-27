export const reduceResolvers = <T extends { Query: any, Mutation: any }>(resolvers: Array<T>) => {
    return resolvers.reduce((acc, cur) => {
        return {
            Query: {...acc.Query, ...cur.Query},
            Mutation: {...acc.Mutation, ...cur.Mutation}
        }
    }, {Query: {}, Mutation: {}})
}
