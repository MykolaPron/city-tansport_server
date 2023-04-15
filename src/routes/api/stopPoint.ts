import {Request, Response, Router} from "express";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Stop Point Root');
});


router.get('/:id/info', (req: Request, res: Response) => {
    const data = {
        id: 24301,
        name: "Вокзал (в бік ЄП)",
        coordinates: {
            latitude: 48.924573,
            longitude: 24.723227
        },
        routesIds:[1,2,3,4,5]
    }
    res.send(data);
});


export default router
