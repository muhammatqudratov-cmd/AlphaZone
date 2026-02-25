import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose
.connect(process.env.MONGO_URL as string, {})
.then((data) => {
    console.log("mongoDB connected successfully");
    const PORT = process.env.PORT ?? 3000;
    })
.catch((er) => console.log("ERROR on your MongoDB"));


