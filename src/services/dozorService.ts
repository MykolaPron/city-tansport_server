import axios, {AxiosResponse} from "axios";

import parse from "node-html-parser";
import {TCityRoutesResponse} from "../types/dozor";
import {getTransportTypeList} from "../utils/DozorHelper";

const url = 'https://city.dozor.tech'
const axiosDozorInstance = axios.create({
    baseURL: url,
    withCredentials: true
})


export const getCityRoutes = async (citySlug: string) => {
    let routes: Array<{

    }> = []

    try {
        const res: AxiosResponse<TCityRoutesResponse> = await axiosDozorInstance.get(
            `/data?t=1`,
            {headers: {Cookie: `gts.web.city=${citySlug}`}} as any
        )

        if (res.status === 200) {
            routes = res.data.data.map((e) => {
                const trajectory = e.lns.map((e) => e.pts)

                const stopPoints = e.zns.map((e) => e.id)

                // const typeList = getTransportTypeList('{1}{2}{3}')
                const typeList = getTransportTypeList(e.inf)
                // const typeName = getTransportTypeName(typeList[typeList.length - 1])
                const type = typeList[typeList.length - 1]

                return {
                    id: e.id,
                    name: e.sNm,
                    type,
                    // color: e.oLC,
                    // trajectory,
                    stopPoints
                }
            })
        }
    } catch (e) {
        console.warn(e)
    }
    return routes
}

export const getCityStopPoints = async (citySlug: string) => {
    let stopPoints: Array<{
        id: number,
        ids:number[],
        name: string,
        coordinates: {
            latitude: number,
            longitude: number,
        },
        routeIds: number[]
    }> = []

    try {
        const res: AxiosResponse<TCityRoutesResponse> = await axiosDozorInstance.get(
            `/data?t=1`,
            {headers: {Cookie: `gts.web.city=${citySlug}`}} as any
        )

        if (res.status === 200) {
            const {data} = res.data

            data.forEach(({id,zns}) => {
                const routeId = id

                zns.forEach(({id, pt, nm}) => {
                    const stopPointName = nm.join('; ')
                    const exist = stopPoints.find(({coordinates, name}) => (
                        coordinates.latitude === pt.lat
                        && coordinates.longitude === pt.lng
                        // && name === stopPointName
                    ))

                    if(exist){
                        stopPoints = stopPoints.map(e => {
                            if(e.id === exist.id){
                                e.routeIds.push(routeId)
                                e.ids.push(id)
                            }

                            return e
                        })
                    }else{
                        stopPoints.push({
                            id: id,
                            ids: [id],
                            name: stopPointName,
                            coordinates: {
                                latitude: pt.lat,
                                longitude: pt.lng,
                            },
                            routeIds: [routeId]
                        })
                    }
                })
            })
        }
    } catch (e) {
        console.warn(e)
    }

    return stopPoints
}
export const getCityInfo = async (citySlug: string) => {
    let cityInfo = {
        logo: '',
        company: '',
        coordinates: {
            latitude: 0,
            longitude: 0
        }
    }

    try {
        const res = await axiosDozorInstance.get(`/${citySlug}`)

        if (res.status === 200) {
            const document = parse(res.data)

            const logo = url + document.querySelector('.logo_panel img')?.attrs.src
            const company = document.querySelector('.logo_panel_label')?.structuredText
            cityInfo.logo = logo ?? ''
            cityInfo.company = company ?? ''

            const coordinatesMatch = document.rawText
                .match(/L.latLng\(-?\d*.\d*,.-?\d*.\d*\)/)

            if (coordinatesMatch) {
                const [latitude, longitude] = coordinatesMatch[0]
                    .slice(9, coordinatesMatch[0].length - 1)
                    .split(', ').map(Number)

                cityInfo.coordinates = {latitude, longitude}
            }
        }

    } catch (e) {
        console.warn(e)
    }

    return cityInfo
}
export const getCitiesList = async () => {
    let citiesList: Array<{ name: string, regionName: string, link: string }> = [];

    try {
        const response = await axiosDozorInstance.get(`/`)

        if (response.status === 200) {
            const document = parse(response.data)

            citiesList = document.querySelectorAll('.select_city_panel_body a')
                .map(({rawText, attrs}) => {
                    const [name, regionName] = rawText.split('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
                    const link = attrs.href.split('/')[2]

                    return {name, regionName, link}
                })
        }
    } catch (e) {
        console.warn(e)
    }

    return citiesList
}
