import { T } from "../libs/types/common";
import express, { Request, Response } from "express";

const gymController: T = {};

gymController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Homa Page");
  } catch (err) {
    console.log("Error. Home Page");
  }
};

gymController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("Signup Page");
  } catch (err) {
    console.log("Error. Signup Page");
  }
};

gymController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login Page");
  } catch (err) {
    console.log("Error. Login Page");
  }
};

export default gymController;
