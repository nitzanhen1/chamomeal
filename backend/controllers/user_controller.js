var express = require("express");
var router = express.Router();
const user_service = require("../services/user_service");
router.use(async function (req, res, next) {
    await user_service.userMiddleware(req,res,next);
});

router.get("/getGlobalDetails", async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const userDetails = await user_service.getGlobalDetails(user_id)
        res.status(200).send(userDetails);
    } catch (error) {
        next(error);
    }
})


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

router.get("/getPreferences", async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const preferences = await user_service.getPreferences(user_id)
        res.status(200).send(preferences);
    } catch (error) {
        next(error);
    }
})

router.post("/resetPassword", async (req, res, next) => {
    try {
        const user_id = req.user_id;
        let {old_pass, new_pass} = req.body
        await user_service.resetPassword(user_id, old_pass, new_pass);
        res.status(201).send({ message: "password updated successfully", success: true });
    } catch (error) {
        next(error);
    }
})

module.exports = router;