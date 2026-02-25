import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose
.connect(process.env.MONGO_URL as string, {})
.then((data) => {
    console.log("mongoDB connected successfully");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function() {
        console.info(`The server is running successfully on port: ${PORT}`);
    });
})
.catch((er) => console.log("ERROR on your MongoDB"));

