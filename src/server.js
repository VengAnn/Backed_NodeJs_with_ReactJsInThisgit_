
//let is varrible type local and var declare for Global varrible;
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
//import cors from 'cors';

require('dotenv').config();

let app = express();
//app.use(cors({ credentials: true, origin: true }));
//Add headers

app.use(function (req, res, next) {

    //website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    //Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET , POST, OPTIONS, PUT, PATCH, DELETE');

    //Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,content-type');

    //set to true if you need the website to include cookies in the requests sent 
    //to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    //Pass to next layer of middleware
    next();
});

//cofig app
// Cấu hình app và các middleware khác
viewEngine(app);
app.use(express.json()); // Middleware xử lý JSON body in file Hmtl
app.use(express.urlencoded({ extended: false })); // Middleware xử lý URL-encoded body
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, () => {
    //callback
    console.log("Backend NodeJs is running on the port: " + port);
});
