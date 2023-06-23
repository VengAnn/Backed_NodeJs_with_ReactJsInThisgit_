
import db from "../models/index";
import user from "../models/user";
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

let displayGetCRUD = async (req, res) => {

    let data = await CRUDService.getAllUser();
    console.log('-------------------------------')
    console.log(data)
    console.log('-------------------------------')

    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    // console.log(userId);
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //check user data not found

        return res.render('editCRUD.ejs', {
            user: userData
        });
        // console.log('---------------------')
        // console.log(userData)
        // console.log('---------------------')
        // return res.send('found users');
    }
    else {
        return res.send('Users not found!');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    });
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD
}