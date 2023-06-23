
import db from "../models/index";
import CRUDService from "../services/CRUDService";


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log("-------------------");
        // console.log(data);
        // console.log("------------------");
        // return res.send("Hello world from controllers")
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log("eror with: " + e);
    }


}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}


let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    //console.log(req.body);
    return res.send('post crud from server');
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}