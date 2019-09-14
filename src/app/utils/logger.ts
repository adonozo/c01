import { format, transports } from 'winston'
const { colorize, combine, label, printf, prettyPrint, splat, timestamp } = format;
import DailyRotateFile = require('winston-daily-rotate-file');
import * as winston from "winston";

export class Logger {
    private static printFormat = printf(({ level, message, label, timestamp }) => {
        return `${level} ${timestamp} [${label}]: ${message}`;
    });

    public static getLogger(label: string): winston.Logger {
        if (!winston.loggers.has(label)) {
            winston.loggers.add(label, this.getFormat(label));
        }
        return winston.loggers.get(label);
    }

    private static getFormat(labelName: string): winston.LoggerOptions {
        return {
            format: combine(
                timestamp(),
                splat(),
                label({ label: labelName }),
                prettyPrint(),
                Logger.printFormat
            ),
            transports: [
                new transports.Console({
                    format: combine(
                        colorize({ colors: { info: 'blue' }, all: true })
                    )
                }),
                new DailyRotateFile({
                    filename: './logs/Log-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                })
            ],
            exitOnError: false
        };
    }
}
