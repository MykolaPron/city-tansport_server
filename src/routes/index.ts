import {Request, Response, Router} from "express";
import app from "./app";
import api from "./api";

const router = Router()

router.use(app)
router.use('/api/v1', api)

router.get('/*', (req: Request, res: Response) => {
    res.render('404', { title: '404 Error', message: 'Hello there!' })
});

export default router
