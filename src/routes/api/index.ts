import {Request, Response, Router} from "express";
import city from "./city";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('API Root');
});
router.use('/city', city);

export default router
