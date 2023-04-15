import {Request, Response, Router} from "express";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Trajectory Root');
});


router.get('/:id/info', (req: Request, res: Response) => {
    const data = {
        id: 24301,
        stopPointsIds: [1, 2],
        routesIds: [1, 2, 3, 4, 5],
        segments: [
            {
                latitude: 48.924573,
                longitude: 24.723227
            },
            {
                latitude: 48.92458,
                longitude: 24.72323
            },
        ]

    }
    res.send(data);
});


export default router
