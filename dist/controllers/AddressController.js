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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const Address_1 = __importDefault(require("../models/Address"));
class AddressController {
    static addAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const user_id = req.user.aud;
            try {
                const AddressData = {
                    user_id,
                    title: data.title,
                    address: data.address,
                    landmark: data.landmark,
                    house: data.house,
                    lat: data.lat,
                    lng: data.lng,
                };
                let address = yield new Address_1.default(AddressData).save();
                // delete address.user_id;
                // delete address.__v;
                const response_address = {
                    title: address.title,
                    address: address.address,
                    landmark: address.landmark,
                    house: address.house,
                    lat: address.lat,
                    lng: address.lng,
                    created_at: address.created_at,
                    updated_at: address.updated_at,
                };
                res.send(response_address);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getUserAddresses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user.aud;
            const perPage = 5;
            const currentPage = parseInt(req.query.page) || 1;
            const prevPage = currentPage == 1 ? null : currentPage - 1;
            let nextPage = currentPage + 1;
            try {
                const address_doc_count = yield Address_1.default.countDocuments({
                    user_id: user_id,
                });
                if (!address_doc_count) {
                    res.json({
                        addresses: [],
                        perPage,
                        currentPage,
                        prevPage,
                        nextPage: null,
                        totalPages: 0,
                        // totalRecords: address_doc_count
                    });
                }
                const totalPages = Math.ceil(address_doc_count / perPage);
                if (totalPages == 0 || totalPages == currentPage) {
                    nextPage = null;
                }
                if (totalPages < currentPage) {
                    // throw new Error('No more Addresses available');
                    throw "No more Addresses available";
                }
                const addresses = yield Address_1.default.find({ user_id }, { user_id: 0, __v: 0 })
                    .skip(currentPage * perPage - perPage)
                    .limit(perPage);
                res.json({
                    addresses,
                    perPage,
                    currentPage,
                    prevPage,
                    nextPage,
                    totalPages,
                    // totalRecords: address_doc_count
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user.aud;
            const id = req.params.id;
            try {
                yield Address_1.default.findOneAndDelete({ user_id: user_id, _id: id });
                res.send({ success: true });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAddressById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user.aud;
            const id = req.params.id;
            try {
                const address = yield Address_1.default.findOne({ user_id: user_id, _id: id }, { user_id: 0, __v: 0 });
                res.send({ address });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static EditAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user.aud;
            const id = req.params.id;
            const data = req.body;
            try {
                const address = yield Address_1.default.findOneAndUpdate({
                    user_id,
                    _id: id,
                }, {
                    title: data.title,
                    address: data.address,
                    landmark: data.landmark,
                    house: data.house,
                    lat: data.lat,
                    lng: data.lng,
                    updated_at: new Date(),
                }, {
                    new: true,
                    projection: { user_id: 0, __v: 0 },
                });
                if (address) {
                    res.send(address);
                }
                else {
                    throw "Address doesn't exist";
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static checkAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user.aud;
            const data = req.query;
            try {
                const address = yield Address_1.default.findOne({ user_id, lat: data.lat, lng: data.lng }, { user_id: 0, __v: 0 });
                res.send({ address });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getLimitedAddresses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user.aud;
            const limit = req.query.limit;
            try {
                const address = yield Address_1.default.findOne({ user_id }, { user_id: 0, __v: 0 }).limit(limit);
                res.send({ address });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.AddressController = AddressController;
