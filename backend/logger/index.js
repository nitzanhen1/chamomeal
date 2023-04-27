const devLogger = require("./devLogger")
const productionLogger = require("./productionLogger")
let logger=  null;

if (process.env.NODE_ENV === "dev") {
    logger = devLogger;
}

if (process.env.NODE_ENV === "production") {
    logger = productionLogger;
}


module.exports =  logger;