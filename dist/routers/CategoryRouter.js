"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const CategoryController_1 = require("../controllers/CategoryController");
class CategoryRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoues();
    }
    getRoutes() {
        this.router.get("/getCategories/:restaurantId", GlobalMiddleWare_1.GlobalMiddleWare.auth, CategoryController_1.CategoryController.getCategoriesByRestaurant);
    }
    postRoutes() { }
    patchRoutes() { }
    putRoutes() { }
    deleteRoues() { }
}
exports.default = new CategoryRouter().router;
