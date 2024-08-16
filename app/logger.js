const { createLogger, format, transports } = require('winston');
const path = require('path');
const { dateTime } = require('../config/settings.js').config;

const isDebug = process.env.DEBUG || 'false';

const logFilePath = path.join(__dirname, '../logs/app.log');

const timeZone = () => {
    return new Date().toLocaleString(dateTime.locales, {
        timeZone: dateTime.timezone
    });
};

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: timeZone }),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new transports.File({ filename: logFilePath }),
        new transports.Console() // Add this line to log to the console
    ]
});

const originalInfo = logger.info;

logger.info = function (message) {
    if (isDebug === 'true') {
        originalInfo.call(logger, message);
    }
};

module.exports = logger;