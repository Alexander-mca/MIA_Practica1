import {Request, Response} from 'express';

class IndexController{
    public index(req:Request,res:Response){
        //const conslt1= await pool.query('Select * from producto');
        //res.json(conslt1);
        res.json( {text:'ya se estabilizó'})
    }
}
export const indexController=new IndexController();