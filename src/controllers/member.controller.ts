import { T } from "../libs/types/common";
import express, { Request, Response }from "express";


 

 const memberController: T ={};

 memberController.goHome =(req: Request, res: Response) => {
    try{
 res.send("Homa Page");
    }catch (err){
        console.log("Error. Home Page")
    }
 };

 memberController.getLogin  =(req: Request, res: Response) => {
    try{
res.send("Login Page")
    }catch (err){
        console.log("Error. Login Page")
    }
 };

 memberController.getSignup =(req: Request, res: Response) => {
    try{
res.send("Signup Page")
    }catch (err){
        console.log("Error. Signup Page")
    }
 };

 export default memberController;

