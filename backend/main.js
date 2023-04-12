require("dotenv").config();
//#region express configures
var express = require("express");
var path = require("path");
// var logger = require("morgan");
const session = require("client-sessions");
const cors = require('cors')

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
    console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
    if (server) {
        server.close(() => console.log("server closed"));
    }
    process.exit();
});
