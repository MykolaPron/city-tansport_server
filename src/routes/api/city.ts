import {Request, Response, Router} from "express";
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', (req: Request, res: Response) => {
    res.send('Citi Root');
});

router.get('/list', (request: Request, response: Response) => {
    const allRegions = prisma.city.findMany({
        select:{
            id: true,
            name: true,
            regionId: true,
        }
    }).then(res=>{
        response.send(res)
    })
});

router.get('/:id/info', (request: Request, response: Response) => {
    const allRegions = prisma.city.findUnique({
        where:{
            id: Number(request.params.id)
        },
        select:{
            id: true,
            name: true,
            regionId: true,
            geolocation:{
                select:{
                    latitude: true,
                    longitude: true
                }
            },
        }
    }).then(res=>{
        console.log(res)
        response.send(res)
    })
});

export default router
