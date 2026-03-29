import express from 'express';
import path from "path";
import router from "./router";
import routerAdmin from './router-admin';
import morgan from "morgan";
import cookieParser  from "cookie-parser";
import { MORGAN_FORMAT } from './libs/config';

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from './libs/types/common';

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: 'sessions'
});




/** 1-ENTRANCE **/
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use("/uploads", express.static("/uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));


/** 2-SESSION **/
app.use(
    session({
        secret: String(process.env.SESSION_SECRET),
        cookie:{
            maxAge: 1000 * 3600 * 6, // 6 hours 
        },
        store:store,
        resave:true,    // false = 12:00am auth 1pm => 3:00pm Active  
        saveUninitialized:true,
    })
);

app.use(function (req,res,next) {                 // Memberimizni qiymatini olish uchun  
    const sessionInstance = req.session as T;
    res.locals.member = sessionInstance.member;
    next();
});
app.use(express.json());



/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTES **/
app.use('/admin', routerAdmin);      // SSR : EJS 

app.use('/', router);               // SPA: REACT  API service sfatida ishlatish

app.use('/', router);                 // SPA: REACT  API service sfatida ishlatish





export default app;     // C.J => module.exports =app