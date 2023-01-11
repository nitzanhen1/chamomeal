var express = require("express");
var router = express.Router();
const DButils = require("../data/db_utils");
const user_service = require("../services/user_service");

router.use(async function (req, res, next) {
    if (req.session && req.session.user_id) {
        DButils.execQuery("SELECT user_id FROM users").then((users) => {
            if (users.find((x) => x.user_id === req.session.user_id)) {
                req.user_id = req.session.user_id;
                next();
            }
        }).catch(err => next(err));
    } else {
        //res.sendStatus(401);
        res.status(419).send({message: "Session expired, please login again", success: false});
    }
});


router.post("/updatePreferences", async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const preferences = req.body;
        await user_service.updatePreferences(user_id, preferences)
        res.status(201).send({ message: "user preferences updated successfully", success: true });
    } catch (error) {
        next(error);
    }
})

module.exports = router;