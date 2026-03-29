import express, { Request, Response } from "express";
const routerAdmin = express.Router();
import gymController from "./controllers/gym.controller";

routerAdmin.get("/", gymController.goHome);

routerAdmin.get("/signup", gymController.getSignup);

routerAdmin.get("/login", gymController.getLogin);


export default routerAdmin;
