
import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    //console.log('your email: ' + email);
    let password = req.body.password;

    if (!email || !password) { //if to check !email or !password is null
        return res.status(500).json({
            errcode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    console.log(userData)
    //check email exist
    //compare password
    //return userInfo
    //access _token: JWT json web token

    return res.status(200).json({
        errcode: userData.errcode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id; //ALL, id

    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters",
            users: []
        })
    }

    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OK',
        users
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,

}