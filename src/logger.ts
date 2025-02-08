import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
        (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
    )
);

const transports = [
    new winston.transports.Console(), 
];

const logger = winston.createLogger({
    level: 'info', // Set the default log level
    levels,
    format,
    transports,
});

export default logger;