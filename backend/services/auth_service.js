const DButils = require("../data/db_utils");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');

async function register(user_details) {
    let users = await DButils.execQuery(`SELECT username, email FROM Users WHERE (username = '${user_details.username}' or email='${user_details.email}')`);
    if (users.length>0) {
        if(user_details.username == users[0].username) {
            throw {status: 409, message: "username already exists"};
        }else{
            throw {status: 412, message: "email already exists"};
        }
    }
    // add the new user
    let hash_password = bcrypt.hashSync(user_details.password, parseInt(process.env.bcrypt_saltRounds));
    let result = await DButils.execQuery(
        `INSERT INTO Users (username, first_name, last_name, password, email, score)
         VALUES ('${user_details.username}', '${user_details.first_name}', '${user_details.last_name}', '${hash_password}', '${user_details.email}', 0)`
    );

    if (result['insertId']){
        await DButils.execQuery(
            `INSERT INTO badges (user_id) VALUES ('${result['insertId']}')`
        );
    }
}

async function login(username, password){
    let user = await DButils.execQuery(`SELECT * FROM Users WHERE (username='${username}' or email='${username}')`);
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

async function forgotPassword(email){
    let user_email = await DButils.execQuery(`SELECT email FROM Users WHERE email = '${email}'`);
    if(user_email.length==0){
        throw {status: 404, message: "email doesn't exists"};
    }
    const verificationCode = await generateResetPasswordCode(user_email[0].email)
    await sendResetPasswordEmail(email, verificationCode);

}
async function generateResetPasswordCode(email) {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const currentTime = Math.floor(Date.now() / 1000);
    const expiryTime = currentTime + 3600;
    try {
        await DButils.execQuery(`update Users set verificationCode='${verificationCode}', expiryTime ='${expiryTime}' where email='${email}'`);
    }catch (error){
        throw error;
    }
    return verificationCode;
}

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
});

const sendResetPasswordEmail = async (email, verificationCode) => {
    const mailOptions = {
        from: 'chamomeal.office@gmail.com', //chamomeal.office@gmail.com
        to: email,
        subject: 'Chamomeal - Reset Your Password',
        text: "hello"
    //     html: `
    //   <p>Your code is: ${verificationCode}</p>
    // `,
    };
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// async function verifyResetPasswordToken(token) {
//     const storedExpiryTime = getExpiryTimeForVerificationCode(verificationCode);
//
//     if (Math.floor(Date.now() / 1000) > storedExpiryTime) {
//         // The code has expired, prompt the user to request a new code
//     } else {
//         // The code is still valid, allow the user to reset their password
//     }
// };

exports.register = register
exports.login = login;
exports.forgotPassword = forgotPassword;