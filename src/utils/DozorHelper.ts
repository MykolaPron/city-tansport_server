export const getTransportTypeName = (type: number): string => {
    if (type === 1) {
        return "МІСЬКІ АВТОБУСИ"
    } else if (type === 1 || type === 4) {
        return "КОМУНАЛЬНИЙ ТРАНСПОРТ"
    } else if (type === 1 || type === 5) {
        return "ПРИМІСЬКІ АВТОБУСИ"
    } else if (type === 1 || type === 6) {
        return "АВТОБУСИ МІСЬКОЇ ТЕРИТОРІАЛЬНОЇ ГРОМАДИ"
    } else if (type === 3) {
        return "ТРМВАЙ"
    } else if (type === 2) {
        return "ТРОЛЕЙБУСИ"
    } else if (type === 8) {
        return "ПЕРЕВЕЗЕННЯ ДО САДОВО-ГОРОДНІХ ДІЛЯНОК"
    } else {
        return "Not Found"
    }
}
export const getTransportTypeList = (info: string) => {
    // 1-Bus / 2-Trollebus
    let transportTypes: number[] = [];
    const matches = info.match(/{\d+}/g)

    if (matches) {
        transportTypes = matches.map(e => {
            return +e.replace(/[{}]/g, '')
        });
    }
    return transportTypes
}
