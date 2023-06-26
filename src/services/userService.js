import db from "../models/index"
import bcrypt from 'bcryptjs';
import user from "../models/user";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist

                let user = await db.User.findOne({
                    // attributes: {
                    //     include: ['email', 'roleId'], // define columns that you want to show
                    //     //exclude: [] // define columns that you don't want 
                    // },
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    //compare password
                    //bcrypt.compareSync("not_bacon", hash); // false
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errcode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password; //remove one obj password
                        console.log(user);
                        userData.user = user;
                    }
                    else {
                        userData.errcode = 3;
                        userData.errMessage = 'Wrong password!';
                    }
                }
                else {
                    userData.errcode = 2;
                    userData.errMessage = "User's not found!"
                }

            } else {
                //return error
                userData.errcode = 1;
                userData.errMessage = "Your's Email isn't exist in your system. please try other email!"
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })


}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId == 'ALL') {
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
}