import {Request, Response, Router} from "express";
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req: Request, res: Response) => {
    const allRegions = await prisma.region.findMany({
        select:{
            id: true,
            name: true,
            geolocation:{
                select:{
                    latitude: true,
                    longitude: true
                }
            }
        }
    })

    res.send(allRegions)
});
router.post('/', async (req: Request, res: Response) => {
    try {
        const newRegion = await prisma.region.create({
            data: req.body
        })

        res.json(newRegion)
    } catch (error: any){
        console.log(error.message)
        res.json(error)
    }
})


router.get('/:id/info', (request: Request, response: Response) => {
    const allRegions = prisma.region.findUnique({
        where:{
          id: Number(request.params.id)
        },
        select:{
            id: true,
            name: true,
            geolocation:{
                select:{
                    latitude: true,
                    longitude: true
                }
            },
            City: {
                select:{id: true, name: true}
            }
        }
    }).then(res=>{
        response.send(res)
    })
});

export default router
