var express = require("express");
var router = express.Router();
const auth_service = require("../services/auth_service");

router.post("/register", async (req, res, next) => {
    try {
        let user_details = {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            email: req.body.email,
        }
        await auth_service.register(user_details);
        res.status(201).send({ message: "new user created", success: true });
    } catch (error) {
        next(error);
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const username =  req.body.username;
        const password = req.body.password;
        const user = await auth_service.login(username, password);
        // Set cookie
        req.session.user_id = user.user_id;
        //return cookie
        res.status(200).send({ message: "successful login", success: true });
    } catch (error) {
        next(error);
    }
});

router.post("/logout", function (req, res) {
    if (!req.session || !req.session.user_id){
        throw { status: 412, message: "no user is logged in" };
    }
    req.session.reset();
    res.status(200).send({ message: "successful logout", success: true});
});

module.exports = router;