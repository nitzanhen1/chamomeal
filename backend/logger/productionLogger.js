const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, json } = format;
require('winston-daily-rotate-file');

const myFormat = printf(({ level, message, label, user_id, timestamp }) => {
    return `${timestamp} [${level}] ${label}: user_id: ${user_id} ${message}`;
});


const productionLogger = () => {
    const logger = createLogger({
        level: 'http',
        format: combine(
            timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
            json()
        ),
        transports: [
            new transports.Console({
                level: 'debug',  // TODO change to info
                format: combine(
                    colorize(),
                    timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                    myFormat
            ),}),
            // new transports.File({
            //     filename: './logger/logs/errors.log',
            //     level: 'error',
            // }),
            new transports.DailyRotateFile({
                filename: './logger/logs/logs-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '200m',
                maxFiles: '21d'
            })
        ]
    });
    return logger
}

module.exports =  productionLogger();

