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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const RestaurantSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    name: { type: String, required: true },
    City_id: { type: mongoose.Types.ObjectId, ref: "cities", required: true },
    // short_name: { type: String, required: true },
    description: { type: String },
    cover: { type: String, required: true },
    location: { type: Object, required: true },
    cuisines: { type: Array, required: true },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    delivery_time: { type: String, required: true },
    isClose: { type: Boolean, required: true, default: false },
    status: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    totalRating: { type: Number, required: true, default: 0 },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
});
RestaurantSchema.index({ location: "2dsphere" }, { background: true });
exports.default = (0, mongoose_1.model)("restaurant", RestaurantSchema);
