use EjeDelMundo;

#consulta de reporte 1
select p.nombre as Nombre_Proveedor,p.telefono as Telefono_Proveedor,dp.No_Orden,round(sum(dp.subtotal),2) as Total 
from Pedido pe,Detalle_Pedido dp,Proveedor p
where (pe.No_Orden=dp.No_Orden and pe.correo_Proveedor=p.correo) 
group by p.nombre,p.telefono,dp.No_Orden
order by Total desc limit 1;

#consulta de reporte 2
select cl.telefono,cl.nombre,round(sum(dv.subtotal),2)as Total from 
((Venta v inner join Detalle_Venta dv on dv.No_Orden=v.No_Orden)
inner join Cliente cl on cl.correo=v.correo_Cliente) 
group by cl.telefono,cl.nombre,dv.No_Orden order by sum(dv.cantidad) desc limit 1;

#consulta de reporte 3
(select d.nombre as direccion,c.nombre as ciudad,r.nombre as region,pr.cod_postal as codigo_Postal
,count(concat(d.nombre,c.nombre,r.nombre)) as Pedidos from ((((Pedido pe inner join Proveedor pr on pr.correo=pe.correo_Proveedor)
inner join Direccion d on d.codigo=pr.cod_Direccion)
inner join Ciudad c on c.codigo=d.cod_Ciudad)inner join Region r on r.codigo=c.cod_Region)
group by d.nombre,c.nombre,r.nombre,pr.cod_postal 
order by Pedidos desc limit 1)
union all
(select d.nombre as direccion,c.nombre as ciudad,r.nombre as region,pr.cod_postal as codigo_Postal
,count(concat(d.nombre,c.nombre,r.nombre)) as Pedidos
from ((((Pedido pe inner join Proveedor pr on pr.correo=pe.correo_Proveedor)
inner join Direccion d on d.codigo=pr.cod_Direccion)
inner join Ciudad c on c.codigo=d.cod_Ciudad)inner join Region r on r.codigo=c.cod_Region)
group by d.nombre,c.nombre,r.nombre,pr.cod_postal 
order by Pedidos asc limit 1);

#consulta reporte 4
select distinct cl.telefono,cl.nombre as cliente,
count(concat(cl.correo,h.category)) as Ordenes,round(sum(h.Total),2) as Total,
sum(h.cantidad) as Cantidad
from (((select dv.No_Orden,p.nombre as producto,c.nombre as Category,dv.subtotal as Total,dv.cantidad from 
((Detalle_Venta dv inner join Producto p on p.codigo=dv.cod_Producto)
inner join Categoria c on c.codigo=p.cod_Categoria) where (lower(c.nombre)="cheese")) h 
inner join Venta v on v.No_Orden=h.No_Orden)inner join Cliente cl
on cl.correo=v.correo_Cliente)
group by cl.telefono,cl.nombre,h.category
order by sum(h.cantidad) desc limit 5;

#consulta reporte 5
(select month(c.registro) as Mes_Registro,c.nombre as Nombre
from ((Venta v inner join Cliente c on v.correo_Cliente=c.correo)
inner join Detalle_Venta dv on dv.No_Orden=v.No_Orden)
group by Mes_Registro,Nombre order by sum(dv.subtotal) desc limit 1)
union all (select month(c.registro) as Mes_Registro,c.nombre as Nombre
from ((Venta v inner join Cliente c on v.correo_Cliente=c.correo)
inner join Detalle_Venta dv on dv.No_Orden=v.No_Orden)
group by Mes_Registro,Nombre order by sum(dv.subtotal) asc limit 1);

#consulta reporte 6, es lo que mas y menos compran los clientes
(select c.nombre as Nombre_Categoria, round(sum(v.subtotal),2) as Total from 
((Detalle_Venta v inner join Producto p on v.cod_Producto=p.codigo)
inner join Categoria c on p.cod_Categoria=c.codigo) 
group by c.nombre order by Total desc limit 1)
union all
(select c.nombre as Nombre_Categoria, round(sum(v.subtotal),2) as Total from 
((Detalle_Venta v inner join Producto p on v.cod_Producto=p.codigo)
inner join Categoria c on p.cod_Categoria=c.codigo) 
group by c.nombre order by Total asc limit 1);


#consulta reporte 7
select pr.nombre,pr.correo,pr.telefono,round(sum(h.total),2) as Total
from (select dp.No_Orden,p.nombre as producto,c.nombre as Category,dp.subtotal as Total,dp.cantidad from 
((Detalle_Pedido dp inner join Producto p on p.codigo=dp.cod_Producto)
inner join Categoria c on c.codigo=p.cod_Categoria) where (lower(c.nombre)="fresh vegetables")) h,
Pedido pe, Proveedor pr
where (pe.No_Orden=h.No_Orden and pe.correo_Proveedor=pr.correo)
group by pr.nombre,pr.correo,pr.telefono
order by sum(h.total) desc limit 5;

#consulta reporte 8
(select d.nombre as direccion,c.nombre as ciudad, r.nombre as region, h.cod_postal as CodigoPostal,h.Total
from ((((select cl.correo,cl.cod_Direccion,cl.cod_postal,round(sum(dv.subtotal),2) as Total
from ((Cliente cl inner join Venta v on cl.correo=v.correo_Cliente) 
inner join Detalle_Venta dv on v.No_Orden=dv.No_Orden)
group by cl.correo,cl.cod_Direccion,cl.cod_postal) h 
inner join Direccion d on d.codigo=h.cod_Direccion)
inner join Ciudad c on c.codigo=d.cod_Ciudad)
inner join Region r on r.codigo=c.cod_Region)
order by h.Total desc limit 1)
union all
(select d.nombre as direccion,c.nombre as ciudad, r.nombre as region, h.cod_postal as CodigoPostal,h.Total
from ((((select cl.correo,cl.cod_Direccion,cl.cod_postal,round(sum(dv.subtotal),2) as Total
from ((Cliente cl inner join Venta v on cl.correo=v.correo_Cliente) 
inner join Detalle_Venta dv on v.No_Orden=dv.No_Orden)
group by cl.correo,cl.cod_Direccion,cl.cod_postal) h 
inner join Direccion d on d.codigo=h.cod_Direccion)
inner join Ciudad c on c.codigo=d.cod_Ciudad)
inner join Region r on r.codigo=c.cod_Region)
order by h.Total asc limit 1);



#consulta reporte 9
select p.nombre as Nombre_Proveedor,p.telefono as Telefono_Proveedor,
pe.No_Orden,round(sum(dp.subtotal),2) as Total_Orden,sum(dp.cantidad) as Cantidad from 
((Pedido pe inner join Proveedor p on pe.correo_Proveedor=p.correo)
inner join Detalle_Pedido dp on pe.No_Orden=dp.No_Orden)
group by p.nombre,p.telefono,pe.No_Orden
order by sum(dp.cantidad) asc,p.nombre asc,p.telefono asc limit 1;

#consulta reporte 10
select m.nombre as NombreCliente,m.Telefono,m.cantidad,round(m.Total,2) as Total from 
(select cl.telefono as Telefono, cl.nombre,h.category,sum(h.Total) as Total,
sum(h.cantidad) as cantidad
from ((select v.correo_Cliente as cliente,p.nombre as producto,ca.nombre as category,
sum(dv.subtotal) as Total,dv.cantidad 
from(((Venta v inner join Detalle_Venta dv on v.No_Orden=dv.No_Orden)
inner join Producto p on dv.cod_Producto=p.codigo)
inner join Categoria ca on ca.codigo=p.cod_Categoria)
group by v.correo_Cliente,p.nombre,ca.nombre,dv.cantidad) h 
inner join Cliente cl on cl.correo=h.cliente)
group by cl.nombre,cl.telefono,h.category having lower(h.category)="seafood") m 
order by m.cantidad desc,m.nombre desc,m.Telefono desc limit 10;
