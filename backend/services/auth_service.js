const DButils = require("../data/db_utils");
const bcrypt = require("bcryptjs");

async function register(user_details) {
    let users = await DButils.execQuery(`SELECT * FROM Users WHERE username = '${user_details.username}'`);
    console.log(users)
    if (users.length>0) {
        throw {status: 409, message: "username already exists"};
    }

    // add the new user
    let hash_password = bcrypt.hashSync(user_details.password, parseInt(process.env.bcrypt_saltRounds));
    await DButils.execQuery(
        `INSERT INTO Users (username, first_name, last_name, password, email, score)
         VALUES ('${user_details.username}', '${user_details.first_name}', '${user_details.last_name}', '${hash_password}', '${user_details.email}', 0)`
    );
}

async function login(username, password){
    let user = await DButils.execQuery(`SELECT * FROM Users WHERE username = '${username}'`);
    // check that username exists
    if(user.length>0) {
        user = user[0];
        // check that the password is correct
        if (bcrypt.compareSync(password, user.password)) {
            return user;
        }
    }
    throw {status: 404, message: "username or password incorrect"};

}

exports.register = register
exports.login = login;