import {Request, Response} from 'express';
import pool from '../database';
import stringify from 'json-stringify-safe';

class IndexController{
    public index(req:Request,res:Response){
        //const conslt1= await pool.query('Select * from producto');
        //res.json(conslt1);
        res.json( {text:'ya se estabilizó'})
    }
    public async consulta1(req:Request,res:Response){
        await pool.query('Select * from notas where nota>76',function(err,resultado, ){
            if(err)throw err;
            res.json(resultado);
        });
    }
    
}
export const indexController=new IndexController();