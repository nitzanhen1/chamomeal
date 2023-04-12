var express = require("express");
var router = express.Router();
const user_service = require("../services/user_service");
router.use(async function (req, res, next) {
    await user_service.userMiddleware(req,res,next);
});

router.get("/getGlobalDetails", async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const globalDetails = await user_service.getGlobalDetails(user_id)
        res.status(200).send(globalDetails);
    } catch (error) {
        next(error);
    }
})


router.post("/updatePreferences", async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const preferences = req.body;
        await user_service.updatePreferences(user_id, preferences)
        res.status(202).send({ message: "user preferences updated successfully", success: true });
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

router.post("/updatePassword", async (req, res, next) => {
    try {
        const user_id = req.user_id;
        let {old_pass, new_pass} = req.body
        await user_service.updatePassword(user_id, old_pass, new_pass);
        res.status(202).send({ message: "password updated successfully", success: true });
    } catch (error) {
        next(error);
    }
})

router.get("/getUserDetails", async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const userDetails = await user_service.getUserDetails(user_id)
        res.status(200).send(userDetails);
    } catch (error) {
        next(error);
    }
})

router.post("/updateUserDetails", async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const details = req.body;
        await user_service.updateUserDetails(user_id, details)
        res.status(202).send({ message: "user details updated successfully", success: true });
    } catch (error) {
        next(error);
    }
})

module.exports = router;