"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        //const conslt1= await pool.query('Select * from producto');
        //res.json(conslt1);
        res.json({ text: 'ya se estabilizó' });
    };
    return IndexController;
}());
exports.indexController = new IndexController();
