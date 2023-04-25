import {GraphQLResolveInfo} from "graphql/type";

const getSelections = (info: GraphQLResolveInfo) => {
    return info.fieldNodes[0].selectionSet?.selections || null
}

export const extractSelection = (info: GraphQLResolveInfo) => {
    const selections = getSelections(info)
    if (!selections) return [];

    return selections.reduce<string[]>((initValue, selection) => {
        if (selection.kind === "Field") {
            return [...initValue, selection.name.value]
        }
        return initValue
    }, [])
}
