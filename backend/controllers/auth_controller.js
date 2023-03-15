var express = require("express");
var router = express.Router();
const auth_service = require("../services/auth_service");

router.post("/register", async (req, res, next) => {
    try {
        let user_details = req.body
        await auth_service.register(user_details);
        res.status(201).send({ message: "new user created", success: true });
    } catch (error) {
        next(error);
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await auth_service.login(username, password);
        // Set cookie
        req.session.user_id = user.user_id;
        if(user['EER']==null){ //not update preferences
            res.status(202).send({ message: "login without preferences", success: true });
        }
        else { //return cookie
            res.status(200).send({message: "successful login", success: true});
        }
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