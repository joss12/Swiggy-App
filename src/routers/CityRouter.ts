import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { CityController } from "../controllers/CityController";
import { CityValidators } from "../validators/CityValidators";

class CityRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoues();
  }

  getRoutes() {
    this.router.get("/cities", CityController.getCities);
  }

  postRoutes() {
    this.router.post(
      "/create",
      CityValidators.addCity(),
      GlobalMiddleWare.checkError,
      CityController.addCity
    );
  }

  patchRoutes() {}

  putRoutes() {}
  deleteRoues() {}
}

export default new CityRouter().router;
