"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const environment_1 = require("./environments/environment");
const UserRouter_1 = __importDefault(require("./routers/UserRouter"));
const BannerRouter_1 = __importDefault(require("./routers/BannerRouter"));
const CityRouter_1 = __importDefault(require("./routers/CityRouter"));
const RestaurantRouter_1 = __importDefault(require("./routers/RestaurantRouter"));
const CategoryRouter_1 = __importDefault(require("./routers/CategoryRouter"));
const ItemRouter_1 = __importDefault(require("./routers/ItemRouter"));
const AddressRouter_1 = __importDefault(require("./routers/AddressRouter"));
const OrderRouter_1 = __importDefault(require("./routers/OrderRouter"));
const Utils_1 = require("./utils/Utils");
const Redis_1 = require("./utils/Redis");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.setConfigs();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigs() {
        this.dotenvConfigs();
        this.connectMongoDB();
        this.connectRedis();
        this.allowCors();
        this.configBodyParser();
    }
    dotenvConfigs() {
        Utils_1.Utils.dotenvConfigs();
    }
    connectMongoDB() {
        mongoose.connect((0, environment_1.getEnvironmentVariables)().db_uri).then(() => {
            console.log("Connected to mongodb.");
        });
    }
    connectRedis() {
        Redis_1.Redis.connectToRedis();
    }
    configBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }
    allowCors() {
        this.app.use((0, cors_1.default)());
    }
    setRoutes() {
        this.app.use("/src/uploads", express_1.default.static("src/uploads"));
        this.app.use("/api/user", UserRouter_1.default);
        this.app.use("/api/banner", BannerRouter_1.default);
        this.app.use("/api/city", CityRouter_1.default);
        this.app.use("/api/restaurant", RestaurantRouter_1.default);
        this.app.use("/api/category", CategoryRouter_1.default);
        this.app.use("/api/item", ItemRouter_1.default);
        this.app.use("/api/address", AddressRouter_1.default);
        this.app.use("/api/order", OrderRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Not Found",
                status_code: 404,
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || "Not Something went wrong. Please try again",
                status_code: 404,
            });
            next();
        });
    }
}
exports.Server = Server;
