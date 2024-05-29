import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { CategoryController } from "../controllers/CategoryController";

class CategoryRouter {
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
    this.router.get(
      "/getCategories/:restaurantId",
      GlobalMiddleWare.auth,
      CategoryController.getCategoriesByRestaurant
    );
  }

  postRoutes() {}

  patchRoutes() {}

  putRoutes() {}
  deleteRoues() {}
}

export default new CategoryRouter().router;
