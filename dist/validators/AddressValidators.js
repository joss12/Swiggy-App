"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidators = void 0;
const express_validator_1 = require("express-validator");
class AddressValidators {
    static addAddress() {
        return [
            (0, express_validator_1.body)("title", "title is required").isString(),
            (0, express_validator_1.body)("landmark", "title is required").isString(),
            (0, express_validator_1.body)("address", "title is required").isString(),
            (0, express_validator_1.body)("house", "title is required").isString(),
            (0, express_validator_1.body)("lat", "title is required").isNumeric(),
            (0, express_validator_1.body)("lng", "title is required").isNumeric(),
        ];
    }
    static EditAddress() {
        return [
            (0, express_validator_1.body)("title", "title is required").isString(),
            (0, express_validator_1.body)("landmark", "title is required").isString(),
            (0, express_validator_1.body)("address", "title is required").isString(),
            (0, express_validator_1.body)("house", "title is required").isString(),
            (0, express_validator_1.body)("lat", "title is required").isNumeric(),
            (0, express_validator_1.body)("lng", "title is required").isNumeric(),
        ];
    }
    static checkAddress() {
        return [
            (0, express_validator_1.query)("lat", "Latitude is required").isNumeric(),
            (0, express_validator_1.query)("lng", "Longitude is required").isNumeric(),
        ];
    }
    static getLimitedAddresses() {
        return [(0, express_validator_1.query)("limit", "Address limit is required").isNumeric()];
    }
}
exports.AddressValidators = AddressValidators;
