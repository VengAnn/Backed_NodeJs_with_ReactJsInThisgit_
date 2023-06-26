
//let is varrible type local and var declare for Global varrible;
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors';

require('dotenv').config();

let app = express();
app.use(cors({ credentials: true, origin: true }));

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
