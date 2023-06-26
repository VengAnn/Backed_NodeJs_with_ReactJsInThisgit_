import express from "express";
import res from "express/lib/response";
import homeController from "../controllers/homecontrollers";
import { HostNotFoundError } from "sequelize";
import userController from "../controllers/userController";


// const express = require('express');
// const { Response } = require('express');

let router = express.Router();

let initWebRouters = (app) => {

    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);



    return app.use("/", router);

    // router.get('/vengann', (req, res) => {
    //     return res.send("Hello From Veng Ann")
    // });

}

module.exports = initWebRouters;
