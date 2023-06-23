import express from "express";
import res from "express/lib/response";
import homeController from "../controllers/homecontrollers";

// const express = require('express');
// const { Response } = require('express');

let router = express.Router();

let initWebRouters = (app) => {

    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    // router.get('/vengann', (req, res) => {
    //     return res.send("Hello From Veng Ann")
    // });

    return app.use("/", router);
}

module.exports = initWebRouters;
