import express from "express";
const routerAdmin = express.Router();
import gymController from "./controllers/gym.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

/** Restaurant */
routerAdmin.get("/", gymController.goHome);
routerAdmin
.get("/login", gymController.getLogin)
.post("/login", gymController.processLogin);
routerAdmin
.get("/signup", gymController.getSignup)
.post("/signup",
   makeUploader("members").single("memberImage"),
   gymController.processSignup);

routerAdmin
.get("/logout", gymController.logout);

routerAdmin
.get("/check-me", gymController.checkAuthSession);

/** Product */
routerAdmin.get("/product/all", 
  gymController.verifyRestaurant, 
  productController.getAllProducts);

routerAdmin.post("/product/create",
  gymController.verifyRestaurant, 
  makeUploader("products").array("productImages", 5),
  productController.createNewProduct);

routerAdmin.post("/product/:id", 
  gymController.verifyRestaurant, 
  productController.updateChosenProduct);
/** User */

routerAdmin.get("/user/all", 
  gymController.verifyRestaurant,
  gymController.getUsers);

  routerAdmin.post("/user/edit", 
  gymController.verifyRestaurant,
  gymController.updateChosenUser);

export default routerAdmin; 