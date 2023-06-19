//import express from "express";
import express from "express";

function configViewEngine(app) {
    // Cấu hình view engine
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
    app.use(express.static("./src/public"));
}

export default configViewEngine;

