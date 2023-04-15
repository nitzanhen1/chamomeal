const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, json } = format;
require('winston-daily-rotate-file');

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}] ${label}: ${message}`;
});


const productionLogger = () => {
    const logger = createLogger({
        level: 'debug',
        format: combine(
            timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
            json()
        ),
        transports: [
            new transports.Console({
                level: 'info',
                format: combine(
                    colorize(),
                    timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                    myFormat
            ),}),
            new transports.File({
                filename: './logger/logs/errors.log',
                level: 'error',
                format: combine(
                    timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                    myFormat
                ),
            }),
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

