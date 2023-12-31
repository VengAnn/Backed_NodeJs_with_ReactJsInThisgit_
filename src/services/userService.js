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
            if (userId === 'ALL') {
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

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }

    })
}

let createNewUser = (data) => { //varrible data value from client;
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist ??tồn tại hay không
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errcode: 1,
                    errMessage: 'Your email is already in used, please try another email!'
                })
            }
            else {
                let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashUserPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender == '1' ? true : false,
                    roleId: data.roleId,
                });
                resolve({
                    errcode: 0,
                    message: 'User created successfully!',
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        //check user is exist ??tồn tại hay không
        let foundUser = await db.User.findOne({
            where: { id: userId },
            //raw: true, //is object raw you can check on internet for more information;
        })
        if (!user) {
            resolve({
                errcode: 2,
                errMessage: `The User isn't exist`
            })
        }
        // if(foundUser)
        // {
        //     await foundUser.destroy(); //if have user this element is run and destroy the use (destroy=delete)
        // }
        //check if user foundUser is run step below
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errcode: 0,
            message: `The User is deleted`
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errcode: 2,
                    errMessage: `Missing required parameters`
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();

                resolve({
                    errcode: 0,
                    message: `Update the User Succesfuly!`
                })
            } else {
                resolve({
                    errMessage: 1,
                    errMessage: `User's not found!`
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
}