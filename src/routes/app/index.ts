import {Request, Response, Router} from "express";
import {getCityRoutes} from "../../services/dozorService";
import region from "../api/region";

const router = Router()

router.use('/region', region)
router.get('/',(req: Request, res: Response) => {
    // regionModel.list.then(list=>{
    //     const payload = {
    //         header:{
    //             cities:  list.map(e=>e.name)
    //         }
    //     }
    //     res.render('index', {payload})
    // });


});
router.get('/test', (req: Request, response: Response) => {
    getCityRoutes('iv-frankivsk').then(res => {
        // console.log(res)
        response.send({total: res.length, data: res})
    })
});

export default router
