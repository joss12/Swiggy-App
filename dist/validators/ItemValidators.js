"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemValidators = void 0;
const express_validator_1 = require("express-validator");
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const Category_1 = __importDefault(require("../models/Category"));
class ItemValidators {
    static addItem() {
        return [
            (0, express_validator_1.body)("itemImages", "Cover image is required").custom((cover, { req }) => {
                if (req.file) {
                    return true;
                }
                else {
                    // throw new Error('File not uploaded');
                    throw "File not uploaded";
                }
            }),
            (0, express_validator_1.body)("name", "Item Name is required").isString(),
            (0, express_validator_1.body)("restaurant_id", "Restaurant Id is required")
                .isString()
                .custom((restaurant_id, { req }) => {
                return Restaurant_1.default.findById(restaurant_id)
                    .then((restaurant) => {
                    if (restaurant) {
                        return true;
                    }
                    else {
                        // throw new Error('Restaurant doesnot exist');
                        throw "Restaurant doesnot exist";
                    }
                })
                    .catch((e) => {
                    throw new Error(e);
                });
            }),
            (0, express_validator_1.body)("category_id", "Category Id is required")
                .isString()
                .custom((category_id, { req }) => {
                return Category_1.default.findOne({
                    _id: category_id,
                    restaurant_id: req.body.restaurant_id,
                })
                    .then((category) => {
                    if (category) {
                        return true;
                    }
                    else {
                        // throw new Error('Category doesnot exist');
                        throw "Category doesnot exist";
                    }
                })
                    .catch((e) => {
                    throw new Error(e);
                });
            }),
            (0, express_validator_1.body)("price", "Price is required").isString(),
            (0, express_validator_1.body)("veg", "Item is veg  is required").isBoolean(),
            (0, express_validator_1.body)("status", "Status is required").isBoolean(),
        ];
    }
    static getMenuItems() {
        return [
            (0, express_validator_1.param)("restaurantId", "Restaurant Id is required")
                .isString()
                .custom((restaurant_id, { req }) => {
                return Restaurant_1.default.findById(restaurant_id)
                    .then((restaurant) => {
                    if (restaurant) {
                        req.restaurant = restaurant;
                        return true;
                    }
                    else {
                        // throw new Error('Restaurant doesn\'t exist');
                        throw "Restaurant doesn't exist";
                    }
                })
                    .catch((e) => {
                    throw new Error(e);
                });
            }),
        ];
    }
}
exports.ItemValidators = ItemValidators;
