import {TCoordinates} from "./index";

type TRouteStopPoint = {
    id: number
    nm: string[]
    ctr: TCoordinates
    pt: TCoordinates
}
type TRouteTrajectory = {
    pts: TCoordinates[]
}
type TCityRoute = {
    id: number
    inf: string
    lns: TRouteTrajectory[]
    nm: string[]
    oLC: string
    prc: number
    sNm: string
    zns: TRouteStopPoint[]
}
export type TCityRoutesResponse = {
    hash: number
    data: TCityRoute[]
}