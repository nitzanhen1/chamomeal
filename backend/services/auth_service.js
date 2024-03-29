const DButils = require("../data/db_utils");
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const logger = require("../logger")

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
        return (result['insertId'])
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
        } else{
            throw {status: 403, message: "username or password incorrect"};
        }
    }else if(user.length==0){
        throw {status: 403, message: "username or password incorrect"};
    }

}

async function forgotPassword(email){
    let user_email = await DButils.execQuery(`SELECT first_name, email FROM Users WHERE email = '${email}'`);
    if(user_email.length==0){
        throw {status: 403, message: "email doesn't exists"};
    }
    const verificationCode = await generateResetPasswordCode(user_email[0].email)
    let success =  await sendResetPasswordEmail(user_email[0].first_name, user_email[0].email, verificationCode);
    return success;
}
async function generateResetPasswordCode(email) {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const currentTime = Math.floor(Date.now() / 1000);
    const expiryTime = currentTime + 600;
    try {
        await DButils.execQuery(`update Users set verificationCode='${verificationCode}', expiryTime ='${expiryTime}' where email='${email}'`);
        logger.debug({label:'resetPassword', message:`token generated for user ${email}`, user_id:0, meta:{ email: email}})
    }catch (error){
        throw error;
    }
    return verificationCode;
}

async function sendResetPasswordEmail(first_name, email, verificationCode){
    logger.info({label: 'send password', message:`send email to ${email}` , user_id: 0, meta:{ first_name: first_name}})
    const msg = {
        to: email,
        from: 'chamomeal.office@gmail.com',
        subject: 'איפוס סיסמה באפליקציית Chamomeal',
        html: `
            <html lang="he" dir="rtl">
                <head>
                    <meta charset="utf-8">
                    <title>Password Reset</title>
                </head>
                <body>
                    <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
                    <div style="background-color: #ffffff; padding: 20px;">
                        <h1>איפוס סיסמה</h1>
                        <p>שלום ${first_name},</p>
                        <p>קיבלנו את בקשתך לאיפוס הסיסמה.</p>
                        <p>להמשך התהליך יש להכניס באפליקציה את הקוד הבא:</p>
                        <h2 style="margin-top: 40px;">${verificationCode}</script></h2>
                        <p>תודה,<br>אפליקציית chamomeal</p>
                        </div>
                    </div>
                </body>
            </html>
        `,
    };
    try {
        let success = await sgMail.send(msg);
        if(success){
            logger.info({label: 'email sent', message:`email sent to ${email}` , user_id: 0, meta:{ first_name: first_name}})
            return true;
        }
    }catch (error) {
        logger.info({label: 'email error', message:`email not sent to ${email}` , user_id: 0, meta:{ error: error, first_name: first_name}})
        console.log(error);
        return false;
    }
}

async function verifyResetPasswordCode(email, code) {
    let user_email = await DButils.execQuery(`select expiryTime from Users where email='${email}' and verificationCode='${code}'`);
    if(user_email.length>0) {
        await DButils.execQuery(`update Users set verificationCode=null, expiryTime=null where email='${email}'`);
        if (Math.floor(Date.now() / 1000) > user_email[0]['expiryTime']) {
            throw {status: 401, message: "verification code expired"};
        } else {
            return true;
        }
    }
    else{
        throw {status: 408, message: "verification code is incorrect"};
    }
}
async function resetPassword(email, newPassword) {
    try {
        let hash_password = bcrypt.hashSync(newPassword, parseInt(process.env.bcrypt_saltRounds));
        await DButils.execQuery(`UPDATE Users SET password = '${hash_password}' WHERE email = '${email}'`);
    }catch (error){
        throw error;
    }
}

exports.register = register
exports.login = login;
exports.forgotPassword = forgotPassword;
exports.verifyResetPasswordCode = verifyResetPasswordCode;
exports.resetPassword = resetPassword;