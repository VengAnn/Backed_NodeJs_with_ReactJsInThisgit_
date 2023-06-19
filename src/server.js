
//let is varrible type local and var declare for Global varrible;
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";

require('dotenv').config();

let app = express();

// Cấu hình app và các middleware khác //config app
viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, () => {
    //callback
    console.log("Backend NodeJs is running on the port: " + port);
});
