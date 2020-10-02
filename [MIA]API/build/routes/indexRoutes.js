"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var indexController_1 = require("../controllers/indexController");
var IndexRoutes = /** @class */ (function () {
    function IndexRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    IndexRoutes.prototype.config = function () {
        this.router.get('/', indexController_1.indexController.index);
        this.router.get('/consulta1', indexController_1.indexController.consulta1);
        this.router.get('/consulta2', indexController_1.indexController.consulta2);
        this.router.get('/consulta3', indexController_1.indexController.consulta3);
        this.router.get('/consulta4', indexController_1.indexController.consulta4);
        this.router.get('/consulta5', indexController_1.indexController.consulta5);
        this.router.get('/consulta6', indexController_1.indexController.consulta6);
        this.router.get('/consulta7', indexController_1.indexController.consulta7);
        this.router.get('/consulta8', indexController_1.indexController.consulta8);
        this.router.get('/consulta9', indexController_1.indexController.consulta9);
        this.router.get('/consulta10', indexController_1.indexController.consulta10);
        this.router.get('/eliminarTemporal', indexController_1.indexController.eliminarTemporal);
        this.router.get('/eliminarModelo', indexController_1.indexController.eliminarModelo);
        this.router.get('/cargarTemporal', indexController_1.indexController.cargarTemporal);
        this.router.get('/cargarModelo', indexController_1.indexController.cargarModelo);
    };
    return IndexRoutes;
}());
var indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
