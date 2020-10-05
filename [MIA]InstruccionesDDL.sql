create database EjeDelMundo;
use EjeDelMundo;
CREATE TABLE Region(
	codigo integer AUTO_INCREMENT primary key,
    nombre varchar(100)
);
CREATE TABLE Ciudad(
	codigo integer AUTO_INCREMENT primary key,
    nombre varchar(100),
    cod_Region integer not null,
    foreign key (cod_Region) References Region(codigo)
);
CREATE TABLE Direccion(
	codigo integer auto_increment primary key,
    nombre varchar(100),
    cod_Ciudad integer,
    foreign key (cod_Ciudad) References Ciudad(codigo)
);
CREATE TABLE Proveedor(
    nombre varchar(100),
    correo varchar(100) primary key,
    telefono varchar(100),
    registro date,
    cod_postal integer,
    cod_Direccion integer,
    foreign key (cod_Direccion) References Direccion(codigo)
);
CREATE TABLE Cliente(
    nombre varchar(100),
    correo varchar(100) primary key,
    telefono varchar(100),
    registro date,
    cod_postal integer,
    cod_Direccion integer,
    foreign key (cod_Direccion) References Direccion(codigo)
);
CREATE TABLE Compania(
	correo varchar(100) primary key,
    nombre varchar(100),
    contacto varchar(100),
    telefono varchar(100)
);
CREATE TABLE Categoria(
	codigo integer auto_increment primary key,
    nombre varchar(100)
);
CREATE TABLE Producto(
	codigo integer auto_increment primary key,
    nombre varchar(100),
    precio float,
    cod_Categoria integer,
    foreign key (cod_Categoria) References Categoria(codigo)
);
CREATE TABLE Pedido(
	No_Orden integer auto_increment primary key,
    correo_Compania varchar(100),
    correo_Proveedor varchar(100),
    foreign key (correo_Compania) References Compania(correo),
    foreign key (correo_Proveedor) References Proveedor(correo)
);
CREATE TABLE Detalle_Pedido(
	No_Orden integer,
    cod_Producto integer,
	foreign key (No_Orden) References Pedido(No_Orden),
    foreign key (cod_Producto) References Producto(codigo),
    cantidad integer,
    subtotal double    
);

CREATE TABLE Venta(
	No_Orden integer auto_increment primary key,
    correo_Cliente varchar(100),
    correo_Compania varchar(100),
    foreign key(correo_Cliente) References Cliente(correo),
    foreign key (correo_Compania) References Compania(correo)
);
CREATE TABLE Detalle_Venta (
    No_Orden INTEGER,
    cod_Producto INTEGER,
    FOREIGN KEY (No_Orden) REFERENCES Venta (No_Orden),
    FOREIGN KEY (cod_Producto) REFERENCES Producto (codigo),
    cantidad INTEGER,
    subtotal DOUBLE
);
