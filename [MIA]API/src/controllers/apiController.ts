import {Request, Response} from 'express';
import pool from '../database';

class ApiController{
    public async consulta1(req:Request,res:Response){
        const conslt1= await pool.query('Select * from producto');
        res.json(conslt1);
    }
}
export const apiController=new ApiController();