var express = require("express");
var router = express.Router();
const user_service = require("../services/user_service");
const logger = require("../logger")

router.use(async function (req, res, next) {
    await user_service.userMiddleware(req,res,next);
});

router.get("/getGlobalDetails", async (req, res, next) => {
    logger.http({label: 'GET /getGlobalDetails', message:'request', user_id: req.user_id, controller: 'user', meta:{}})
    try {
        const user_id = req.user_id;
        const globalDetails = await user_service.getGlobalDetails(user_id)
        res.status(200).send(globalDetails);
        logger.http({label: 'GET /getGlobalDetails', message:'success', user_id: req.user_id, controller: 'user', meta:{ status: 200, body: '' }});
    } catch (error) {
        logger.http({label: 'GET /getGlobalDetails', message:'error', user_id: req.user_id, controller: 'user', meta: {error: error, }});
        next(error);
    }
})


router.post("/updatePreferences", async (req, res, next) => {
    // logger.http({label: 'POST /updatePreferences', message:'request', user_id: req.user_id, controller: 'user', meta:{}})
    try {
        const user_id = req.user_id;
        const preferences = req.body;
        await user_service.updatePreferences(user_id, preferences)
        res.status(202).send({ message: "user preferences updated successfully", success: true });
        logger.http({label: 'POST /updatePreferences', message:'success', user_id: req.user_id, controller: 'user', meta:{ status: 202, body:'user preferences updated successfully' }});
    } catch (error) {
        logger.http({label: 'POST /updatePreferences', message:'error', user_id: req.user_id, controller: 'user', meta: {error: error, }});
        next(error);
    }
})

router.get("/getPreferences", async (req, res, next) => {
    // logger.http({label: 'GET /getPreferences', message:'request', user_id: req.user_id, controller: 'user', meta:{}})
    try {
        const user_id = req.user_id;
        const preferences = await user_service.getPreferences(user_id)
        res.status(200).send(preferences);
        logger.http({label: 'GET /getPreferences', message:'success', user_id: req.user_id, controller: 'user', meta:{ status: 200, body:'' }});
    } catch (error) {
        logger.http({label: 'GET /getPreferences', message:'error', user_id: req.user_id, controller: 'user', meta: {error: error, }});
        next(error);
    }
})

router.post("/updatePassword", async (req, res, next) => {
    // logger.http({label: 'POST /updatePassword', message:'request', user_id: req.user_id, controller: 'user', meta:{}})
    try {
        const user_id = req.user_id;
        let {old_pass, new_pass} = req.body
        await user_service.updatePassword(user_id, old_pass, new_pass);
        res.status(202).send({ message: "password updated successfully", success: true });
        logger.http({label: 'POST /updatePassword', message:'success', user_id: req.user_id, controller: 'user', meta:{ status: 202, body:'password updated successfully' }});
    } catch (error) {
        logger.http({label: 'POST /updatePassword', message:'error', user_id: req.user_id, controller: 'user', meta: {error: error, }});
        next(error);
    }
})

router.get("/getUserDetails", async (req, res, next) => {
    // logger.http({label: 'GET /getUserDetails', message:'request', user_id: req.user_id, controller: 'user', meta:{}})
    try {
        const user_id = req.user_id;
        const userDetails = await user_service.getUserDetails(user_id)
        res.status(200).send(userDetails);
        logger.http({label: 'GET /getUserDetails', message:'success', user_id: req.user_id, controller: 'user', meta:{ status: 200, body:'' }});
    } catch (error) {
        logger.http({label: 'GET /getUserDetails', message:'error', user_id: req.user_id, controller: 'user', meta: {error: error, }});
        next(error);
    }
})

router.post("/updateUserDetails", async (req, res, next) => {
    // logger.http({label: 'POST /updateUserDetails', message:'request', user_id: req.user_id, controller: 'user', meta:{}})
    try {
        const user_id = req.user_id;
        const details = req.body;
        await user_service.updateUserDetails(user_id, details)
        res.status(202).send({ message: "user details updated successfully", success: true });
        logger.http({label: 'POST /updateUserDetails', message:'success', user_id: req.user_id, controller: 'user', meta:{ status: 202, body:'user details updated successfully' }});
    } catch (error) {
        logger.http({label: 'POST /updateUserDetails', message:'error', user_id: req.user_id, controller: 'user', meta: {error: error, }});
        next(error);
    }
})

module.exports = router;