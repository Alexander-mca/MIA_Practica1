use EjeDelMundo;

#consulta de reporte 1
select p.nombre as NombreProveedor,p.telefono as TelefonoProveedor,pe.No_Orden as Numero_Orden
,pe.total as Total from Proveedor p, Pedido pe 
order by pe.total desc,p.nombre desc,p.telefono desc limit 1;

#consulta de reporte 2
select c.telefono,c.nombre,round((select sum(v.total) from Venta v 
where c.correo=v.correo_Cliente),2)as Total from Venta v,Cliente c 
where c.correo=v.correo_Cliente group by c.correo 
order by sum(v.cantidad) desc,c.nombre desc limit 1;

#consulta de reporte 3
(select h.dir as direccion,h.ciudad,h.reg as region,h.cp as Codigo_Postal,h.Cantidad as Pedidos from
(select d.nombre as dir,c.nombre as ciudad,r.nombre as reg,p.cod_postal as cp,count(concat(d.nombre,c.nombre,r.nombre,p.cod_postal)) as Cantidad 
from ((((Pedido pe join Proveedor p on pe.correo_Proveedor=p.correo) 
inner join Direccion d on p.cod_Direccion=d.codigo) inner join Ciudad c on c.codigo=d.cod_Ciudad)
inner join Region r on r.codigo=c.cod_Region) group by  dir,ciudad,reg,cp) h order by h.Cantidad desc limit 1)
union all
(select h.dir as direccion,h.ciudad,h.reg as region,h.cp as Codigo_Postal,h.Cantidad as Pedidos from
(select d.nombre as dir,c.nombre as ciudad,r.nombre as reg,p.cod_postal as cp,
count(concat(d.nombre,c.nombre,r.nombre,p.cod_postal)) as Cantidad 
from ((((Pedido pe inner join Proveedor p on pe.correo_Proveedor=p.correo) 
inner join Direccion d on p.cod_Direccion=d.codigo) inner join Ciudad c on c.codigo=d.cod_Ciudad)
inner join Region r on r.codigo=c.cod_Region) group by  dir,ciudad,reg,cp) h order by h.Cantidad asc limit 1);

#consulta reporte 4
select m.Telefono,m.nombre,m.Ordenes,round(m.Total,2) from 
(select cl.telefono as Telefono, cl.nombre,h.category,count(h.cliente) as Ordenes,sum(h.cantidad)as cantidad,sum(h.Total) as Total
from ((select v.correo_Cliente as cliente,p.nombre as producto,ca.nombre as category,v.total as Total,v.cantidad 
from((Venta v inner join Producto p on v.cod_Producto=p.codigo)
inner join Categoria ca on ca.codigo=p.cod_Categoria)) h inner join Cliente cl on cl.correo=h.cliente)
group by cl.nombre,cl.telefono,h.category having lower(h.category)="cheese") m 
order by m.cantidad desc limit 5;

#consulta reporte 5
(select month(c.registro) as Mes_Registro,c.nombre as Nombre
from Venta v inner join Cliente c on v.correo_Cliente=c.correo
group by Mes_Registro,Nombre order by sum(v.total) desc limit 1)
union all (select month(c.registro) as Mes_Registro,c.nombre as Nombre
from Venta v inner join Cliente c on v.correo_Cliente=c.correo
group by Mes_Registro,Nombre order by sum(v.total) asc limit 1);

#consulta reporte 6, es lo que mas y menos compran los clientes
(select c.nombre as Nombre_Categoria, round(sum(v.total),2) as Total from 
((Venta v inner join Producto p on v.cod_Producto=p.codigo)
inner join Categoria c on p.cod_Categoria=c.codigo) 
group by c.nombre order by Total desc limit 1)
union all
(select c.nombre as Nombre_Categoria, round(sum(v.total),2) as Total from 
((Venta v inner join Producto p on v.cod_Producto=p.codigo)
inner join Categoria c on p.cod_Categoria=c.codigo) 
group by c.nombre order by Total asc limit 1);


#consulta reporte 7
select m.Telefono,m.nombre,m.correo,round(m.Total,2) as Total from 
(select cl.telefono as Telefono, cl.nombre,cl.correo,h.category,count(h.cliente) as Ordenes,sum(h.Total) as Total
from ((select v.correo_Proveedor as cliente,p.nombre as producto,ca.nombre as category,v.total as Total 
from((Pedido v inner join Producto p on v.cod_Producto=p.codigo)
inner join Categoria ca on ca.codigo=p.cod_Categoria)) h inner join Proveedor cl on cl.correo=h.cliente)
group by cl.nombre,cl.telefono,cl.correo,h.category having lower(h.category)="fresh vegetables") m 
group by m.Telefono,m.nombre,m.correo,m.Total order by Total desc limit 5;

#consulta reporte 8
(select d.nombre as direccion,c.nombre as ciudad, r.nombre as region, h.cod_postal as Codigo_Postal
 from((((select c.nombre,c.correo,c.cod_postal,c.cod_Direccion,sum(v.total) as Total from Venta v inner join 
Cliente c on v.correo_Cliente=c.correo 
group by c.nombre,c.correo,c.cod_postal,c.cod_Direccion) h 
inner join Direccion d on d.codigo=h.cod_Direccion)
inner join Ciudad c on d.cod_Ciudad=c.codigo) 
inner join Region r on c.cod_Region=r.codigo) order by h.Total desc,c.nombre desc limit 1)
union all 
(select d.nombre as direccion,c.nombre as ciudad, r.nombre as region, h.cod_postal as Codigo_Postal
 from((((select c.nombre,c.correo,c.cod_postal,c.cod_Direccion,sum(v.total) as Total from Venta v inner join 
Cliente c on v.correo_Cliente=c.correo 
group by c.nombre,c.correo,c.cod_postal,c.cod_Direccion) h 
inner join Direccion d on d.codigo=h.cod_Direccion)
inner join Ciudad c on d.cod_Ciudad=c.codigo) 
inner join Region r on c.cod_Region=r.codigo) order by h.Total asc,c.nombre asc limit 1);

#consulta reporte 9
select p.nombre as Nombre_Proveedor,p.telefono as Telefono_Proveedor,
pe.No_Orden,round(pe.total,2) as Total_Orden from 
Pedido pe inner join Proveedor p on pe.correo_Proveedor=p.correo 
order by pe.cantidad asc,p.nombre asc,p.telefono asc limit 1;

#consulta reporte 10
select m.nombre as NombreCliente,m.Telefono,m.cantidad,round(m.Total,2) as Total from 
(select cl.telefono as Telefono, cl.nombre,h.category,sum(h.Total) as Total,sum(h.cantidad) as cantidad
from ((select v.correo_Cliente as cliente,p.nombre as producto,ca.nombre as category,v.total as Total,v.cantidad 
from((Venta v inner join Producto p on v.cod_Producto=p.codigo)
inner join Categoria ca on ca.codigo=p.cod_Categoria)) h inner join Cliente cl on cl.correo=h.cliente)
group by cl.nombre,cl.telefono,h.category having lower(h.category)="seafood") m 
order by m.cantidad desc,m.nombre desc,m.Telefono desc limit 10;
