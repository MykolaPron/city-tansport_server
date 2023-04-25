import {Request, Response, Router} from "express";
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', (req: Request, res: Response) => {
    res.send('Transport Root');
});


router.get('/types', (request: Request, response: Response) => {
    const allRegions = prisma.transportType.findMany({
        select:{
            id: true,
            name: true,
        }
    }).then(res=>{
        response.send(res)
    })
});


export default router
