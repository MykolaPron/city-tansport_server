import {Router} from "express";
import app from "./app";
import api from "./api";

const router = Router()

router.use(app)
router.use('/api', api)

export default router
