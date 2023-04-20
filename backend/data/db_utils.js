require("dotenv").config();
const MySql = require("./mysql");
const logger = require("./logger")

exports.execQuery = async function (query) {
    let returnValue = []
const connection = await MySql.connection();
    try {
    await connection.query("START TRANSACTION");
    returnValue = await connection.query(query);
  } catch (err) {
    await connection.query("ROLLBACK");
    logger.error({label: 'database', message:`ROLLBACK at querySignUp, ${err}`, user_id: 0, meta:{error: err}});
    throw err;
  } finally {
    await connection.release();
  }
  return returnValue
}


