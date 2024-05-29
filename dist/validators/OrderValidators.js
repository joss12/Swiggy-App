"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidators = void 0;
const express_validator_1 = require("express-validator");
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
class OrderValidators {
    static placeOrder() {
        return [
            (0, express_validator_1.body)("restaurant_id", "Restaurant ID is required").isString()
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
            (0, express_validator_1.body)("order", "Order Items is required").isString(),
            (0, express_validator_1.body)("address", "Address is required").isString(),
            (0, express_validator_1.body)("status", "Order status is required").isString(),
            (0, express_validator_1.body)("payment_status", "Payment status is required").isBoolean(),
            (0, express_validator_1.body)("payment_mode", "Payment mode is required").isString(),
            (0, express_validator_1.body)("total", "Order Total is required").isNumeric(),
            (0, express_validator_1.body)("grandTotal", "Order GrandTotal is required").isNumeric(),
            (0, express_validator_1.body)("deliveryCharge", "Delivery Charge is required").isNumeric(),
        ];
    }
}
exports.OrderValidators = OrderValidators;
