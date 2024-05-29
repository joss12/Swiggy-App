import { body, query } from "express-validator";

export class AddressValidators {
  static addAddress() {
    return [
      body("title", "title is required").isString(),
      body("landmark", "title is required").isString(),
      body("address", "title is required").isString(),
      body("house", "title is required").isString(),
      body("lat", "title is required").isNumeric(),
      body("lng", "title is required").isNumeric(),
    ];
  }

  static EditAddress() {
    return [
      body("title", "title is required").isString(),
      body("landmark", "title is required").isString(),
      body("address", "title is required").isString(),
      body("house", "title is required").isString(),
      body("lat", "title is required").isNumeric(),
      body("lng", "title is required").isNumeric(),
    ];
  }
  static checkAddress() {
    return [
      query("lat", "Latitude is required").isNumeric(),
      query("lng", "Longitude is required").isNumeric(),
    ];
  }

  static getLimitedAddresses() {
    return [query("limit", "Address limit is required").isNumeric()];
  }
}
