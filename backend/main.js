require("dotenv").config();
//#region express configures
var express = require("express");
var path = require("path");
// var logger = require("morgan");
const session = require("client-sessions");
const cors = require('cors')
const logger = require("./logger")

const app = express();
// app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(
    session({
        cookieName: "session", // the cookie key name
        secret: process.env.COOKIE_SECRET, // the encryption key
        //secret: "template", // the encryption key
        // duration: 24 * 60 * 60 * 1000, // expired after 20 sec
        // activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
        cookie: {
            httpOnly: false,
        }
        //the session will be extended by activeDuration milliseconds
    })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files
//local:
app.use(express.static(path.join(__dirname, "dist")));
//remote:
// app.use(express.static(path.join(__dirname, '../assignment-3-3-basic/dist')));
app.get("/",function(req,res)
{
    //remote:
    // res.sendFile(path.join(__dirname, '../assignment-3-3-basic/dist/index.html'));
    //local:
    res.sendFile(__dirname+"/index.html");

});

app.use(cors());
app.options("*", cors());

// const corsConfig = {
//     origin: true,
//     credentials: true
// };

// app.use(cors(corsConfig));
// app.options("*", cors(corsConfig));

// var port = process.env.PORT || "3000"; //for local
var port = process.env.PORT || "443"; //for remote
//#endregion
const user = require("./controllers/user_controller");
const recipes = require("./controllers/recipe_controller");
const auth = require("./controllers/auth_controller");
const search = require("./controllers/search_controller");


// ----> For cheking that our server is alive
app.get("/alive", (req, res) => res.send("I'm alive"));
app.get("/session", (req, res) => res.send(req.session));

app.get("/privacy", (req, res) =>{
    logger.http({label: 'GET /privacy', message:'request', user_id: 0, controller: 'main', meta:{}})
    try{
        const privacy = `
            <!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Privacy Policy</title>
</head>
<body>
	<h1>Privacy Policy</h1>
	
	<p>Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our application and other sites we own and operate.</p>

	<h2>Information we collect</h2>

	<p>We only collect information about you if we have a reason to do so - for example, to provide our services, to communicate with you, or to improve our application. We collect this information in two ways: through information you provide to us and through automated technologies such as cookies.</p>

	<h3>Information you provide to us</h3>

	<p>We may collect your name, email address or other contact information when you fill out a form on our application or contact us for support. We may also collect other information you provide to us, such as feedback or comments.</p>

	<h3>Automated technologies</h3>

	<p>We may also collect information about your use of our application through automated technologies such as cookies and other tracking technologies. This information may include your IP address, browser type, operating system, referring URLs, and other information about how you interact with our application.</p>

	<h2>How we use your information</h2>

	<p>We use the information we collect to provide and improve our services, to communicate with you, and to personalize your experience on our application. We may also use your information to analyze how you use our application and to identify trends and patterns in usage.</p>

	<h2>How we share your information</h2>

	<p>We do not sell, trade, or rent your personal information to third parties. We may also share your information if required by law, to protect our rights or the rights of others, or to comply with a legal process.</p>

	<h2>Security</h2>

	<p>We take reasonable measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no data transmission over the internet or electronic storage system can be guaranteed to be 100% secure.</p>

	<h2>Changes to this policy</h2>

	<p>We reserve the right to update or change this privacy policy at any time. We will notify you of any changes by posting the new privacy policy on our application. Your continued use of our application after any changes to this policy will constitute your acceptance of the changes.</p>

	<h2>Contact us</h2>

	<p>If you have any questions or concerns about our privacy policy, please contact us at chamomeal.office@gmail.com.</p>
</body>
</html>
        `

        res.status(200).send(privacy);
        logger.http({label: 'GET /privacy', message:'success', user_id: 0, controller: 'main', meta:{}});
    }catch(error){
        logger.http({label: 'GET /privacy', message:'error', user_id:0, controller: 'main', meta: {}});
    }
});

// Routings
app.use("/user", user);
app.use("/recipes", recipes);
app.use("/auth", auth);
app.use("/search", search);

// Default router
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send({ message: err.message, success: false });
});



const server = app.listen(port, () => {
    logger.info({label: 'server', message:`Server listen on port ${port}`, user_id: 0, meta:{}})
});

process.on("SIGINT", function () {
    if (server) {
        server.close(() => logger.info({label: 'server', message:'server closed', user_id: 0, meta:{}}));
    }
    process.exit();
});

module.exports = app;
