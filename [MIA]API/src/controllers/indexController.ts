import {Request, Response} from 'express';
import pool from '../database';
import fs from 'fs';

class IndexController{
    public index(req:Request,res:Response){
        //const conslt1= await pool.query('Select * from producto');
        //res.json(conslt1);
        res.json( {text:'Bienvenido a la Base de Datos Del Centro de Datos El Eje del Mundo.'})
    }
    public async consulta1(req:Request,res:Response){
        await pool.query('select p.nombre as NombreProveedor,p.telefono as TelefonoProveedor,pe.No_Orden as Numero_Orden,pe.total as Total from Proveedor p, Pedido pe order by pe.total desc,p.nombre desc,p.telefono desc limit 1',
        function(err,resultado, ){
            if(err){
                res.json({text:err.message})
            }else{
                res.json(resultado);
            }
        });
    }
    public async consulta2(req:Request,res:Response){
        const c='select c.telefono,c.nombre,round((select sum(v.total) from Venta v '
        +'where c.correo=v.correo_Cliente),2)as Total from Venta v,Cliente c ' 
       +'where c.correo=v.correo_Cliente group by c.correo '
        +'order by sum(v.cantidad) desc,c.nombre desc limit 1';
        await pool.query(c,function(err,resultado, ){
            if(err){
                res.json({text:err.message})
            }else{
                res.json(resultado);
            }
        });
    }
    public async consulta3(req:Request,res:Response){
        const c='(select h.dir as direccion,h.ciudad,h.reg as region,h.cp as Codigo_Postal,h.Cantidad as Pedidos from '
        +'(select d.nombre as dir,c.nombre as ciudad,r.nombre as reg,p.cod_postal as cp,count(concat(d.nombre,c.nombre,r.nombre,p.cod_postal)) as Cantidad ' 
       +'from ((((Pedido pe join Proveedor p on pe.correo_Proveedor=p.correo) '
        +'inner join Direccion d on p.cod_Direccion=d.codigo) inner join Ciudad c on c.codigo=d.cod_Ciudad) '
        +'inner join Region r on r.codigo=c.cod_Region) group by  dir,ciudad,reg,cp) h order by h.Cantidad desc limit 1) '
        +'union all '
        +'(select h.dir as direccion,h.ciudad,h.reg as region,h.cp as Codigo_Postal,h.Cantidad as Pedidos from '
        +'(select d.nombre as dir,c.nombre as ciudad,r.nombre as reg,p.cod_postal as cp, '
        +'count(concat(d.nombre,c.nombre,r.nombre,p.cod_postal)) as Cantidad '
        +'from ((((Pedido pe inner join Proveedor p on pe.correo_Proveedor=p.correo) '
        +'inner join Direccion d on p.cod_Direccion=d.codigo) inner join Ciudad c on c.codigo=d.cod_Ciudad) '
        +'inner join Region r on r.codigo=c.cod_Region) group by  dir,ciudad,reg,cp) h order by h.Cantidad asc limit 1)';
        await pool.query(c,function(err,resultado, ){
            if(err){
                res.json({text:err.message})
            }else{
                res.json(resultado);
            }
        });
    }
    public async consulta4(req:Request,res:Response){
        const c='select m.Telefono,m.nombre,m.Ordenes,round(m.Total,2) from ' 
        +'(select cl.telefono as Telefono, cl.nombre,h.category,count(h.cliente) as Ordenes,sum(h.cantidad)as cantidad,sum(h.Total) as Total '
        +'from ((select v.correo_Cliente as cliente,p.nombre as producto,ca.nombre as category,v.total as Total,v.cantidad '
        +'from((Venta v inner join Producto p on v.cod_Producto=p.codigo) '
        +'inner join Categoria ca on ca.codigo=p.cod_Categoria)) h inner join Cliente cl on cl.correo=h.cliente) '
        +'group by cl.nombre,cl.telefono,h.category having lower(h.category)="cheese") m '
        +'order by m.cantidad desc limit 5';
        await pool.query(c,function(err,resultado, ){
            if(err){
                res.json({text:err.message})
            }else{
                res.json(resultado);
            }
        });
    }
    public async consulta5(req:Request,res:Response){
        const c='(select month(c.registro) as Mes_Registro,c.nombre as Nombre '
        +'from Venta v inner join Cliente c on v.correo_Cliente=c.correo '
        +'group by Mes_Registro,Nombre order by sum(v.total) desc limit 1) '
        +'union all (select month(c.registro) as Mes_Registro,c.nombre as Nombre '
        +'from Venta v inner join Cliente c on v.correo_Cliente=c.correo '
        +'group by Mes_Registro,Nombre order by sum(v.total) asc limit 1)';
        await pool.query(c,function(err,resultado, ){
            if(err){
                res.json({text:err.message})
            }else{
                res.json(resultado);
            }
        });
    }
    public async consulta6(req:Request,res:Response){
        const c='(select c.nombre as Nombre_Categoria, round(sum(v.total),2) as Total from ' 
        +'((Venta v inner join Producto p on v.cod_Producto=p.codigo) '
        +'inner join Categoria c on p.cod_Categoria=c.codigo) '
        +'group by c.nombre order by Total desc limit 1) '
        +'union all '
        +'(select c.nombre as Nombre_Categoria, round(sum(v.total),2) as Total from '
        +'((Venta v inner join Producto p on v.cod_Producto=p.codigo) '
        +'inner join Categoria c on p.cod_Categoria=c.codigo) '
        +'group by c.nombre order by Total asc limit 1)';
        await pool.query(c,function(err,resultado, ){
            if(err){
                res.json({text:err.message})
            }else{
                res.json(resultado);
            }
        });
    }
    public async consulta7(req:Request,res:Response){
        const c='select m.Telefono,m.nombre,m.correo,round(m.Total,2) as Total from '
        +'(select cl.telefono as Telefono, cl.nombre,cl.correo,h.category,count(h.cliente) as Ordenes,sum(h.Total) as Total '
        +'from ((select v.correo_Proveedor as cliente,p.nombre as producto,ca.nombre as category,v.total as Total '
        +'from((Pedido v inner join Producto p on v.cod_Producto=p.codigo) '
        +'inner join Categoria ca on ca.codigo=p.cod_Categoria)) h inner join Proveedor cl on cl.correo=h.cliente) '
        +'group by cl.nombre,cl.telefono,cl.correo,h.category having lower(h.category)="fresh vegetables") m '
        +'group by m.Telefono,m.nombre,m.correo,m.Total order by Total desc limit 5';
        await pool.query(c,function(err,resultado, ){
            if(err){
                res.json({text:err.message})
            }else{
                res.json(resultado);
            }
        });
    }
    public async consulta8(req:Request,res:Response){
        const c='(select d.nombre as direccion,c.nombre as ciudad, r.nombre as region, h.cod_postal as Codigo_Postal '
            +'from((((select c.nombre,c.correo,c.cod_postal,c.cod_Direccion,sum(v.total) as Total from Venta v inner join '
           +'Cliente c on v.correo_Cliente=c.correo '
           +'group by c.nombre,c.correo,c.cod_postal,c.cod_Direccion) h '
           +'inner join Direccion d on d.codigo=h.cod_Direccion) '
           +'inner join Ciudad c on d.cod_Ciudad=c.codigo) '
           +'inner join Region r on c.cod_Region=r.codigo) order by h.Total desc,c.nombre desc limit 1) '
           +'union all '
           +'(select d.nombre as direccion,c.nombre as ciudad, r.nombre as region, h.cod_postal as Codigo_Postal '
           +'from((((select c.nombre,c.correo,c.cod_postal,c.cod_Direccion,sum(v.total) as Total from Venta v inner join '
           +'Cliente c on v.correo_Cliente=c.correo '
           +'group by c.nombre,c.correo,c.cod_postal,c.cod_Direccion) h '
           +'inner join Direccion d on d.codigo=h.cod_Direccion) '
           +'inner join Ciudad c on d.cod_Ciudad=c.codigo) '
           +'inner join Region r on c.cod_Region=r.codigo) order by h.Total asc,c.nombre asc limit 1)';
        await pool.query(c,function(err,resultado, ){
            if(err){
                res.json({text:err.message})
            }else{
                res.json(resultado);
            }
        });
    }
    public async consulta9(req:Request,res:Response){
        const c='select p.nombre as Nombre_Proveedor,p.telefono as Telefono_Proveedor,'
        +'pe.No_Orden,round(pe.total,2) as Total_Orden from '
        +'Pedido pe inner join Proveedor p on pe.correo_Proveedor=p.correo '
        +'order by pe.cantidad asc,p.nombre asc,p.telefono asc limit 1';
        await pool.query(c,function(err,resultado, ){
            if(err){
                res.json({text:err.message})
            }else{
                res.json(resultado);
            }
        });
    }
    public async consulta10(req:Request,res:Response){
        const c='select m.nombre as NombreCliente,m.Telefono,m.cantidad,round(m.Total,2) as Total from '
        +'(select cl.telefono as Telefono, cl.nombre,h.category,sum(h.Total) as Total,sum(h.cantidad) as cantidad '
        +'from ((select v.correo_Cliente as cliente,p.nombre as producto,ca.nombre as category,v.total as Total,v.cantidad '
        +'from((Venta v inner join Producto p on v.cod_Producto=p.codigo) '
        +'inner join Categoria ca on ca.codigo=p.cod_Categoria)) h inner join Cliente cl on cl.correo=h.cliente) '
        +'group by cl.nombre,cl.telefono,h.category having lower(h.category)="seafood") m '
        +'order by m.cantidad desc,m.nombre desc,m.Telefono desc limit 10';
        await pool.query(c,function(err,resultado, ){
            if(err){
                res.json({text:err.message})
            }else{
                res.json(resultado);
            }
        });
    }
    public async eliminarTemporal(req:Request,res:Response){
        await pool.query('drop table Temporal',function(err,resul,){
            if(err){
                res.json({text:'No existe la Tabla Temporal'});
            }else{
                res.json({text:'Se ha eliminado la Tabla Temporal'});
            }
        });        
    }
    public async cargarTemporal(req:Request,res:Response){
        fs.readFile('../[MIA]CargaDeDatos.sql','utf8',function(err,data){
            if (err) {
                return console.log(err);
            }
            pool.query(data,function(err,resul,){
                if(err){
                    res.json({text:err.message})
                    return console.log(err);
                }else{
                    res.json({text:'Se ha cargado la Tabla Temporal'});
                }
            });               
        });
        
    }
    public async cargarModelo(req:Request,res:Response){        
        fs.readFile('../[MIA]InstruccionesDDL.sql','utf8',function(err,data){
            if (err) {
                return console.log(err);
            }
            pool.query(data,function(err,resul,){
                if(err){
                    res.json({text:err.message})
                    return console.log(err);
                }else{
                    res.json({text:'Se ha cargado El Modelo.'});
                }
            }); 
            
        });   
    }
    public async eliminarModelo(req:Request,res:Response){
        await pool.query('drop database EjeDelMundo',function(err,resul,){
            if(err){
                res.json({text:'Ha surgido un problema. '+err.message});
            }else{
                res.json({text:'Se ha eliminado el Modelo con exito.'});
            }
        });        
    }
}
export const indexController=new IndexController();