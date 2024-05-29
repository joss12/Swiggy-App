"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const AddressController_1 = require("../controllers/AddressController");
const AddressValidators_1 = require("../validators/AddressValidators");
class AddressRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoues();
    }
    getRoutes() {
        this.router.get("/addresses", GlobalMiddleWare_1.GlobalMiddleWare.auth, AddressController_1.AddressController.getUserAddresses);
        this.router.get("/checkAddresses", GlobalMiddleWare_1.GlobalMiddleWare.auth, AddressValidators_1.AddressValidators.checkAddress(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AddressController_1.AddressController.checkAddress);
        this.router.get("/getLimitedAddress", GlobalMiddleWare_1.GlobalMiddleWare.auth, AddressValidators_1.AddressValidators.getLimitedAddresses(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AddressController_1.AddressController.getLimitedAddresses);
        // this.router.get(
        //   "/:id",
        //   GlobalMiddleWare.auth,
        //   AddressController.getAddressById
        // );
    }
    postRoutes() {
        this.router.post("/create", GlobalMiddleWare_1.GlobalMiddleWare.auth, AddressValidators_1.AddressValidators.addAddress(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AddressController_1.AddressController.addAddress);
    }
    patchRoutes() {
        // this.router.patch(
        //     "/edit/:id",
        //     GlobalMiddleWare.auth,
        //     AddressValidators.EditAddress(),
        //     GlobalMiddleWare.checkError,
        //     AddressController.EditAddress
        //   );
    }
    putRoutes() {
        this.router.put("/edit/:id", GlobalMiddleWare_1.GlobalMiddleWare.auth, AddressValidators_1.AddressValidators.EditAddress(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AddressController_1.AddressController.EditAddress);
    }
    deleteRoues() {
        this.router.delete("/delete/:id", GlobalMiddleWare_1.GlobalMiddleWare.auth, AddressController_1.AddressController.deleteAddress);
    }
}
exports.default = new AddressRouter().router;
