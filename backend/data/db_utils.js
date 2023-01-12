require("dotenv").config();
const MySql = require("./mysql");

exports.execQuery = async function (query) {
    let returnValue = []
const connection = await MySql.connection();
    try {
    await connection.query("START TRANSACTION");
    returnValue = await connection.query(query);
  } catch (err) {
    await connection.query("ROLLBACK");
    console.log('ROLLBACK at querySignUp', err);
    throw err;
  } finally {
    await connection.release();
  }
  return returnValue
}

exports.upload = async function (csvData) {
    const connection = await MySql.connection();
    try {
        await connection.query("START TRANSACTION");
        let query = 'INSERT INTO Recipes VALUES ?';

        await connection.query(query, [csvData], (error, response) => {
            console.log(error || response)});
    } catch (err) {
        await connection.query("ROLLBACK");
        console.log('ROLLBACK at querySignUp', err);
        throw err;
    } finally {
        await connection.release();
    }
}

