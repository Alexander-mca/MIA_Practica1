import {Router} from 'express';
import {apiController} from '../controllers/apiController';
class ApiRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }
    config():void {
        this.router.get('/Consulta1',apiController.consulta1);
    }
}
const apiRoutes=new ApiRoutes();
export default apiRoutes.router;