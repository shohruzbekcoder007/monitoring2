const { createLogger, format, transports } = require('winston');

const {
    combine, timestamp, printf, colorize,
} = format;

const applicationLoggerFormat = printf(({ level, message, timestamp }) => {
    const possibleENV = ['production', 'staging'];
    const timestampShowcase = process.env.SHOW_LOGGER_TIME_SPAN || !possibleENV.includes(process.env.NODE_ENV) ? timestamp : '';
    return `🔔 ${timestampShowcase} ${level} : ${message}`;
});

const logger = createLogger({
    format: process.env.NODE_ENV == "staging" || process.env.NODE_ENV == "production" ? combine(timestamp(), applicationLoggerFormat) : combine(timestamp(), colorize(), applicationLoggerFormat),
    transports: [new transports.Console()],
});

module.exports = logger;
