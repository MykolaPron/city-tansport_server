import {Request, Response, Router} from "express";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Citi Root');
});

router.get('/list', (req: Request, res: Response) => {
    res.send({
        total: 2,
        data: [
            {
                id: 1,
                name: 'Івано-Франківськ',
            },
            {
                id: 2,
                name: 'Калуш',
            },
        ]
    });
});

router.get('/:id/info', (req: Request, res: Response) => {
    res.send({
        id: 1,
        name: 'Івано-Франківськ',
        stopPointsIds:[1,2,3,4,5],
        routesIds:[1,2,3]
    });
});


export default router
