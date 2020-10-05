use EjeDelMundo;
CREATE TABLE Temporal(
	nombre_compania varchar(100),
    contacto_compania varchar(100),
    correo_compania varchar(100),
    telefono_compania varchar(100),
    tipo varchar(100),
    nombre varchar(100),
    correo varchar(100),
    telefono varchar(100),
    fecha_registro varchar(100),
    direccion varchar(100),
    ciudad varchar(100),
    codigo_postal varchar(100),
    region varchar(100),
    producto varchar(100),
    categoria_producto varchar(100),
    cantidad varchar(100),
    precio_unitario varchar(100)
);
#select * from Temporal;
#se hace la carga masiva de la ruta, ejecutar comando en terminal
#mysql --local-infile=1 -u root -p EjeDelMundo
#luego pegar el codigo que sigue:
LOAD DATA LOCAL INFILE '/home/alex/Descargas/DataCenterData.csv'
INTO TABLE Temporal
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(nombre_compania,contacto_compania,correo_compania,telefono_compania,tipo,nombre,correo,telefono,fecha_registro,direccion,ciudad,codigo_postal,region,producto,categoria_producto,cantidad,precio_unitario);

#consultas para rellenar el modelo
#rellenar tabla Region
insert into Region (nombre)
select distinct t.region from Temporal t where not t.region is null;

#rellenar tabla Ciudad
insert into Ciudad (nombre,cod_Region)
select distinct t.ciudad,r.codigo from Temporal t, Region r where r.nombre=t.region;

#rellenar la tabla Direccion
insert into Direccion (nombre,cod_Ciudad)
select distinct t.direccion,c.codigo from Temporal t, Ciudad c where c.nombre=t.ciudad;
#select d.nombre,c.nombre,r.nombre from Direccion d,Ciudad c,Region r where (select c.cod_Region from Ciudad c where d.cod_Ciudad=c.codigo limit 1)=r.codigo;

#rellenar la tabla Proveedor
insert into Proveedor(nombre,correo,telefono,registro,cod_postal,cod_Direccion)
select distinct t.nombre,t.correo,t.telefono,str_to_date(t.fecha_registro,'%d/%m/%Y')as FechaRegistro,t.codigo_postal,d.codigo from Temporal t, Direccion d where (lower(t.tipo)="p" and d.nombre=t.direccion);

#rellenar la tabla Cliente
insert into Cliente(nombre,correo,telefono,registro,cod_postal,cod_Direccion)
select distinct t.nombre,t.correo,t.telefono,str_to_date(t.fecha_registro,'%d/%m/%Y')as FechaRegistro,t.codigo_postal,d.codigo from Temporal t, Direccion d where (lower(t.tipo)="c" and d.nombre=t.direccion);

#meter datos a tabla categoria
insert into Categoria(nombre)
select distinct categoria_producto from Temporal where not categoria_producto is null;

#meter datos a tabla Producto
insert into Producto(nombre,precio,cod_Categoria)
select distinct t.producto,round(t.precio_unitario,2),c.codigo from Temporal t, Categoria c where c.nombre=t.categoria_producto;

#meter datos a tabla Compania
insert into Compania(correo,nombre,contacto,telefono)
select distinct t.correo_compania,t.nombre_compania,t.contacto_compania,t.telefono_compania from Temporal t;

#meter datos a tabla Pedido
insert into Pedido (correo_Compania,correo_Proveedor)
select distinct c.correo,p.correo
from Temporal t,Compania c, Proveedor p
where (t.correo_compania=c.correo and lower(t.tipo)="p" and t.correo=p.correo);

#meter datos a tabla Detalle_Pedido
insert into Detalle_Pedido(No_Orden,cod_Producto,cantidad,subtotal)
select pe.No_Orden,p.codigo,t.cantidad,round(p.precio*t.cantidad,2) as Total from Temporal t, Pedido pe,Producto p
where (t.correo=pe.correo_Proveedor and t.correo_compania=pe.correo_Compania and t.producto=p.nombre);

#meter datos a tabla Venta
insert into Venta (correo_Compania,correo_Cliente)
select distinct c.correo,cl.correo
from Temporal t,Compania c, Cliente cl
where (t.correo_compania=c.correo and lower(t.tipo)="c" and t.correo=cl.correo);

#meter datos a tabla Detalle_Venta
insert into Detalle_Venta(No_Orden,cod_Producto,cantidad,subtotal)
select v.No_Orden,p.codigo,t.cantidad,round(p.precio*t.cantidad,2) as Total 
from Temporal t, Venta v,Producto p
where (t.correo=v.correo_Cliente and t.correo_compania=v.correo_Compania 
and t.producto=p.nombre);
