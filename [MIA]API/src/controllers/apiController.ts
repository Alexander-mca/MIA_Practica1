import {Request, Response} from 'express';
import pool from '../database';

class ApiController{
    public async consulta1(req:Request,res:Response){
        await pool.query('Select * from notas',function(err,result,){
            if(err)throw err;
            res.json(result);
        });
    }
}
export const apiController=new ApiController();