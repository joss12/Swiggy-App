"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
class RestaurantValidators {
    static addRestaurant() {
        return [
            (0, express_validator_1.body)("name", "Owner Name is required").isString(),
            (0, express_validator_1.body)("email", "Email is required")
                .isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({
                    email: email,
                    // type: 'user'
                })
                    .then((user) => {
                    if (user) {
                        // throw new Error('User Already Exists');
                        throw "User Already Exists";
                    }
                    else {
                        return true;
                    }
                })
                    .catch((e) => {
                    throw new Error(e);
                });
            }),
            (0, express_validator_1.body)("phone", "Phone number is required").isString(),
            (0, express_validator_1.body)("password", "Password is required")
                .isAlphanumeric()
                .isLength({ min: 8, max: 20 })
                .withMessage("Password must be between 8-20 characters"),
            (0, express_validator_1.body)("restaurant", "Cover image is required").custom((cover, { req }) => {
                if (req.file) {
                    return true;
                }
                else {
                    // throw new Error('File not uploaded');
                    throw "File not uploaded";
                }
            }),
            (0, express_validator_1.body)("res_name", "Restaurant Name is required").isString(),
            (0, express_validator_1.body)("short_name", "Restaurant Short Name is required").isString(),
            (0, express_validator_1.body)("openTime", "Opening time is required").isString(),
            (0, express_validator_1.body)("closeTime", "Closing time is required").isString(),
            (0, express_validator_1.body)("price", "Price is required").isString(),
            (0, express_validator_1.body)("delivery_time", "Delivery time is required").isString(),
            (0, express_validator_1.body)("status", "Status is required").isString(),
            (0, express_validator_1.body)("address", "Address is required").isString(),
            (0, express_validator_1.body)("location", "Location is required").isString(),
            (0, express_validator_1.body)("cuisines", "Cuisines is required").isString(),
            (0, express_validator_1.body)("City_id", "City is required").isString(),
        ];
    }
    static getNearbyRestaurants() {
        return [
            (0, express_validator_1.query)("lat", "Latitude is required").isNumeric(),
            (0, express_validator_1.query)("lng", "Longitude is required").isNumeric(),
            (0, express_validator_1.query)("radius", "Radius is required").isNumeric(),
        ];
    }
    static searchNearbyRestaurants() {
        return [
            (0, express_validator_1.query)("lat", "Latitude is required").isNumeric(),
            (0, express_validator_1.query)("lng", "Longitude is required").isNumeric(),
            (0, express_validator_1.query)("radius", "Radius is required").isNumeric(),
            (0, express_validator_1.query)("name", "Search field is required").isString(),
        ];
    }
}
exports.RestaurantValidators = RestaurantValidators;
