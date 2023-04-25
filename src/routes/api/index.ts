import {Request, Response, Router} from "express";

import transport from "./transport";
import region from "./region";
import city from "./city";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('API Root');
});
router.use('/transport', transport);
router.use('/region', region);
router.use('/city', city);

export default router
