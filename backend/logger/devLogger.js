const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;
require('winston-daily-rotate-file');

const myFormat = printf(({ level, message, service, timestamp }) => {
    return `${timestamp} [${level}] ${service}: ${message}`;
});


const devLogger = () => {
    const logger = createLogger({
        level: 'debug',
        format: combine(
            colorize(),
            timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
            myFormat
        ),
        transports: [
            new transports.Console()
        ]
    });
    return logger
}

module.exports =  devLogger();

