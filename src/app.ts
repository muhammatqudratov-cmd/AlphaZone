import express from 'express';
import path from "path";
import router from './router';


/** 1-ENTRANCE **/
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());



/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTES **/
app.use('/', router);        // SPA: REACT  API service sfatida ishlatish




export default app;