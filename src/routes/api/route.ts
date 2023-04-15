import {Request, Response, Router} from "express";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Route Root');
});


router.get('/:id/info', (req: Request, res: Response) => {
    const data = {
        id: 1310,
        name: "C1",
        type: "Bus",
        stopPointsIds:[1,2,3,4,5],
        trajectoryIds: []
    }
    res.send(data);
});


export default router
