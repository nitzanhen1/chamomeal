const fs = require('fs');
const csv = require('fast-csv');
var express = require("express");
var router = express.Router();
const DButils = require("./db_utils");


async function UploadCsvDataToMySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", async function () {
            // Remove Header ROW
            csvData.shift();

            await DButils.upload(csvData);

        });

    stream.pipe(csvStream);
}
router.post("/uploadData", async (req, res, next) => {
    try {
        await UploadCsvDataToMySQL(req.body.filename);
        // res.status(200).send({message:"ok"});
    } catch (error) {
        next(error);
    }
})

module.exports = router;
