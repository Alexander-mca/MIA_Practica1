"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
var fs_1 = __importDefault(require("fs"));
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        //const conslt1= await pool.query('Select * from producto');
        //res.json(conslt1);
        res.json({ text: 'Bienvenido a la Base de Datos Del Centro de Datos El Eje del Mundo.' });
    };
    IndexController.prototype.consulta1 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = 'select p.nombre as Nombre_Proveedor,p.telefono as Telefono_Proveedor,dp.No_Orden,round(sum(dp.subtotal),2) as Total '
                            + 'from Pedido pe,Detalle_Pedido dp,Proveedor p '
                            + 'where (pe.No_Orden=dp.No_Orden and pe.correo_Proveedor=p.correo) '
                            + 'group by p.nombre,p.telefono,dp.No_Orden '
                            + 'order by Total desc limit 1';
                        return [4 /*yield*/, database_1.default.query(c, function (err, resultado) {
                                if (err) {
                                    res.json({ text: err.message });
                                }
                                else {
                                    res.json(resultado);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.consulta2 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = 'select cl.telefono,cl.nombre,round(sum(dv.subtotal),2)as Total from '
                            + '((Venta v inner join Detalle_Venta dv on dv.No_Orden=v.No_Orden) '
                            + 'inner join Cliente cl on cl.correo=v.correo_Cliente) '
                            + 'group by cl.telefono,cl.nombre,dv.No_Orden order by sum(dv.cantidad) desc limit 1';
                        return [4 /*yield*/, database_1.default.query(c, function (err, resultado) {
                                if (err) {
                                    res.json({ text: err.message });
                                }
                                else {
                                    res.json(resultado);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.consulta3 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = '(select d.nombre as direccion,c.nombre as ciudad,r.nombre as region,pr.cod_postal as codigo_Postal '
                            + ',count(concat(d.nombre,c.nombre,r.nombre)) as Pedidos from ((((Pedido pe inner join Proveedor pr on pr.correo=pe.correo_Proveedor) '
                            + 'inner join Direccion d on d.codigo=pr.cod_Direccion) '
                            + 'inner join Ciudad c on c.codigo=d.cod_Ciudad)inner join Region r on r.codigo=c.cod_Region) '
                            + 'group by d.nombre,c.nombre,r.nombre,pr.cod_postal '
                            + 'order by Pedidos desc limit 1) '
                            + 'union all '
                            + '(select d.nombre as direccion,c.nombre as ciudad,r.nombre as region,pr.cod_postal as codigo_Postal '
                            + ',count(concat(d.nombre,c.nombre,r.nombre)) as Pedidos '
                            + 'from ((((Pedido pe inner join Proveedor pr on pr.correo=pe.correo_Proveedor) '
                            + 'inner join Direccion d on d.codigo=pr.cod_Direccion) '
                            + 'inner join Ciudad c on c.codigo=d.cod_Ciudad)inner join Region r on r.codigo=c.cod_Region) '
                            + 'group by d.nombre,c.nombre,r.nombre,pr.cod_postal '
                            + 'order by Pedidos asc limit 1);';
                        return [4 /*yield*/, database_1.default.query(c, function (err, resultado) {
                                if (err) {
                                    res.json({ text: err.message });
                                }
                                else {
                                    res.json(resultado);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.consulta4 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = 'select distinct cl.telefono,cl.nombre as cliente,'
                            + 'count(concat(cl.correo,h.category)) as Ordenes,round(sum(h.Total),2) as Total,'
                            + 'sum(h.cantidad) as Cantidad '
                            + 'from (((select dv.No_Orden,p.nombre as producto,c.nombre as Category,dv.subtotal as Total,dv.cantidad from '
                            + '((Detalle_Venta dv inner join Producto p on p.codigo=dv.cod_Producto) '
                            + 'inner join Categoria c on c.codigo=p.cod_Categoria) where (lower(c.nombre)="cheese")) h '
                            + 'inner join Venta v on v.No_Orden=h.No_Orden)inner join Cliente cl '
                            + 'on cl.correo=v.correo_Cliente) '
                            + 'group by cl.telefono,cl.nombre,h.category '
                            + 'order by sum(h.cantidad) desc limit 5';
                        return [4 /*yield*/, database_1.default.query(c, function (err, resultado) {
                                if (err) {
                                    res.json({ text: err.message });
                                }
                                else {
                                    res.json(resultado);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.consulta5 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = '(select month(c.registro) as Mes_Registro,c.nombre as Nombre '
                            + 'from ((Venta v inner join Cliente c on v.correo_Cliente=c.correo) '
                            + 'inner join Detalle_Venta dv on dv.No_Orden=v.No_Orden) '
                            + 'group by Mes_Registro,Nombre order by sum(dv.subtotal) desc limit 1) '
                            + 'union all (select month(c.registro) as Mes_Registro,c.nombre as Nombre '
                            + 'from ((Venta v inner join Cliente c on v.correo_Cliente=c.correo) '
                            + 'inner join Detalle_Venta dv on dv.No_Orden=v.No_Orden) '
                            + 'group by Mes_Registro,Nombre order by sum(dv.subtotal) asc limit 1)';
                        return [4 /*yield*/, database_1.default.query(c, function (err, resultado) {
                                if (err) {
                                    res.json({ text: err.message });
                                }
                                else {
                                    res.json(resultado);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.consulta6 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = '(select c.nombre as Nombre_Categoria, round(sum(v.subtotal),2) as Total from '
                            + '((Detalle_Venta v inner join Producto p on v.cod_Producto=p.codigo) '
                            + 'inner join Categoria c on p.cod_Categoria=c.codigo) '
                            + 'group by c.nombre order by Total desc limit 1) '
                            + 'union all '
                            + '(select c.nombre as Nombre_Categoria, round(sum(v.subtotal),2) as Total from '
                            + '((Detalle_Venta v inner join Producto p on v.cod_Producto=p.codigo) '
                            + 'inner join Categoria c on p.cod_Categoria=c.codigo) '
                            + 'group by c.nombre order by Total asc limit 1);';
                        return [4 /*yield*/, database_1.default.query(c, function (err, resultado) {
                                if (err) {
                                    res.json({ text: err.message });
                                }
                                else {
                                    res.json(resultado);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.consulta7 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = 'select pr.nombre,pr.correo,pr.telefono,round(sum(h.total),2) as Total '
                            + 'from (select dp.No_Orden,p.nombre as producto,c.nombre as Category,dp.subtotal as Total,dp.cantidad from '
                            + '((Detalle_Pedido dp inner join Producto p on p.codigo=dp.cod_Producto) '
                            + 'inner join Categoria c on c.codigo=p.cod_Categoria) where (lower(c.nombre)="fresh vegetables")) h, '
                            + 'Pedido pe, Proveedor pr '
                            + 'where (pe.No_Orden=h.No_Orden and pe.correo_Proveedor=pr.correo) '
                            + 'group by pr.nombre,pr.correo,pr.telefono '
                            + 'order by sum(h.total) desc limit 5;';
                        return [4 /*yield*/, database_1.default.query(c, function (err, resultado) {
                                if (err) {
                                    res.json({ text: err.message });
                                }
                                else {
                                    res.json(resultado);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.consulta8 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = '(select d.nombre as direccion,c.nombre as ciudad, r.nombre as region, h.cod_postal as CodigoPostal,h.Total '
                            + 'from ((((select cl.correo,cl.cod_Direccion,cl.cod_postal,round(sum(dv.subtotal),2) as Total '
                            + 'from ((Cliente cl inner join Venta v on cl.correo=v.correo_Cliente) '
                            + 'inner join Detalle_Venta dv on v.No_Orden=dv.No_Orden) '
                            + 'group by cl.correo,cl.cod_Direccion,cl.cod_postal) h '
                            + 'inner join Direccion d on d.codigo=h.cod_Direccion) '
                            + 'inner join Ciudad c on c.codigo=d.cod_Ciudad) '
                            + 'inner join Region r on r.codigo=c.cod_Region) '
                            + 'order by h.Total desc limit 1) '
                            + 'union all '
                            + '(select d.nombre as direccion,c.nombre as ciudad, r.nombre as region, h.cod_postal as CodigoPostal,h.Total '
                            + 'from ((((select cl.correo,cl.cod_Direccion,cl.cod_postal,round(sum(dv.subtotal),2) as Total '
                            + 'from ((Cliente cl inner join Venta v on cl.correo=v.correo_Cliente) '
                            + 'inner join Detalle_Venta dv on v.No_Orden=dv.No_Orden) '
                            + 'group by cl.correo,cl.cod_Direccion,cl.cod_postal) h '
                            + 'inner join Direccion d on d.codigo=h.cod_Direccion) '
                            + 'inner join Ciudad c on c.codigo=d.cod_Ciudad) '
                            + 'inner join Region r on r.codigo=c.cod_Region) '
                            + 'order by h.Total asc limit 1);';
                        return [4 /*yield*/, database_1.default.query(c, function (err, resultado) {
                                if (err) {
                                    res.json({ text: err.message });
                                }
                                else {
                                    res.json(resultado);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.consulta9 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = 'select p.nombre as Nombre_Proveedor,p.telefono as Telefono_Proveedor, '
                            + 'pe.No_Orden,round(sum(dp.subtotal),2) as Total_Orden,sum(dp.cantidad) as Cantidad from '
                            + '((Pedido pe inner join Proveedor p on pe.correo_Proveedor=p.correo) '
                            + 'inner join Detalle_Pedido dp on pe.No_Orden=dp.No_Orden) '
                            + 'group by p.nombre,p.telefono,pe.No_Orden '
                            + 'order by sum(dp.cantidad) asc,p.nombre asc,p.telefono asc limit 1;';
                        return [4 /*yield*/, database_1.default.query(c, function (err, resultado) {
                                if (err) {
                                    res.json({ text: err.message });
                                }
                                else {
                                    res.json(resultado);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.consulta10 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = 'select m.nombre as NombreCliente,m.Telefono,m.cantidad,round(m.Total,2) as Total from '
                            + '(select cl.telefono as Telefono, cl.nombre,h.category,sum(h.Total) as Total, '
                            + 'sum(h.cantidad) as cantidad '
                            + 'from ((select v.correo_Cliente as cliente,p.nombre as producto,ca.nombre as category, '
                            + 'sum(dv.subtotal) as Total,dv.cantidad '
                            + 'from(((Venta v inner join Detalle_Venta dv on v.No_Orden=dv.No_Orden) '
                            + 'inner join Producto p on dv.cod_Producto=p.codigo) '
                            + 'inner join Categoria ca on ca.codigo=p.cod_Categoria) '
                            + 'group by v.correo_Cliente,p.nombre,ca.nombre,dv.cantidad) h '
                            + 'inner join Cliente cl on cl.correo=h.cliente) '
                            + 'group by cl.nombre,cl.telefono,h.category having lower(h.category)="seafood") m '
                            + 'order by m.cantidad desc,m.nombre desc,m.Telefono desc limit 10;';
                        return [4 /*yield*/, database_1.default.query(c, function (err, resultado) {
                                if (err) {
                                    res.json({ text: err.message });
                                }
                                else {
                                    res.json(resultado);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.eliminarTemporal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('drop table Temporal', function (err, resul) {
                            if (err) {
                                res.json({ text: 'No existe la Tabla Temporal' });
                            }
                            else {
                                res.json({ text: 'Se ha eliminado la Tabla Temporal' });
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.cargarTemporal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fs_1.default.readFile('../[MIA]CargaDeDatos.sql', 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    database_1.default.query(data, function (err, resul) {
                        if (err) {
                            res.json({ text: err.message });
                            return console.log(err);
                        }
                        else {
                            res.json({ text: 'Se ha cargado la Tabla Temporal' });
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    IndexController.prototype.cargarModelo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fs_1.default.readFile('../[MIA]InstruccionesDDL.sql', 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    database_1.default.query(data, function (err, resul) {
                        if (err) {
                            res.json({ text: err.message });
                            return console.log(err);
                        }
                        else {
                            res.json({ text: 'Se ha cargado El Modelo.' });
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    IndexController.prototype.eliminarModelo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('drop database EjeDelMundo', function (err, resul) {
                            if (err) {
                                res.json({ text: 'Ha surgido un problema. ' + err.message });
                            }
                            else {
                                res.json({ text: 'Se ha eliminado el Modelo con exito.' });
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return IndexController;
}());
exports.indexController = new IndexController();
