var express = require("express");
var router = express.Router();
const auth_service = require("../services/auth_service");
const logger = require("../logger")

router.post("/register", async (req, res, next) => {
    // logger.http({label: 'POST /register', message:'request', user_id: 0, controller: 'auth', meta:{username: req.body.username, email: req.body.email}})
    try {
        let user_details = req.body
        await auth_service.register(user_details);
        res.status(201).send({ message: "new user created", success: true });
        logger.http({label: 'POST /register', message:'success', user_id: 0, controller: 'auth', meta:{ status: 201, body: 'new user created', username: req.body.username, email: req.body.email }});
    } catch (error) {
        logger.http({label: 'POST /register', message:'error', user_id: 0, controller: 'auth', meta: {error: error, username: req.body.username, email: req.body.email}});
        next(error);
    }
})

router.post("/login", async (req, res, next) => {
    // logger.http({label: 'POST /login', message:'request', user_id: 0, controller: 'auth', meta:{username: req.body.username}})
    try {
        const { username, password } = req.body;
        const user = await auth_service.login(username, password);
        // Set cookie
        req.session.user_id = user.user_id;
        if(user['EER']==null){ //not update preferences
            res.status(202).send({ message: "login without preferences", success: true });
            logger.http({label: 'POST /login', message:'success', user_id: user.user_id, controller: 'auth', meta:{ status: 202, body: 'login without preferences', username: req.body.username}});
        }
        else { //return cookie
            res.status(200).send({message: "successful login", success: true});
            logger.http({label: 'POST /login', message:'success', user_id: user.user_id, controller: 'auth', meta:{ status: 200, body: 'successful login', username: req.body.username}});
        }
    } catch (error) {
        logger.http({label: 'POST /login', message:'error', user_id: 0, controller: 'auth', meta: {error: error, username: req.body.username}});
        next(error);
    }
});

router.post("/logout", function (req, res) {
    // logger.http({label: 'POST /logout', message:'request', user_id: req.session.user_id, controller: 'auth', meta:{}})
    if (!req.session || !req.session.user_id){
        throw { status: 419, message: "no user is logged in" };
        logger.http({label: 'POST /logout', message:'error', user_id: 0, controller: 'auth', meta: {error: { status: 419, message: "no user is logged in" }}});
    }
    logger.http({label: 'POST /logout', message:'success', user_id: req.session.user_id, controller: 'auth', meta:{ status: 200, body: 'successful logout'}});
    req.session.reset();
    res.status(200).send({ message: "successful logout", success: true});
});

router.post('/forgotPassword', async (req, res, next) => {
    // logger.http({label: 'POST /forgotPassword', message:'request', user_id: 0, controller: 'auth', meta:{email: req.body.email}})
    try {
    const { email } = req.body;
    await auth_service.forgotPassword(email);
    res.status(200).send({ message: "successful sent verification code to email", success: true});
        logger.http({label: 'POST /forgotPassword', message:'success', user_id: 0, controller: 'auth', meta:{ status: 200, body: 'successful sent verification code to email', email: email }});
    }catch (error) {
        logger.http({label: 'POST /forgotPassword', message:'error', user_id: 0, controller: 'auth', meta:{ error: error, email: req.body.email }});
        next(error);
    }
});

module.exports = router;