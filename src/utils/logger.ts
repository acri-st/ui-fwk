// ----------------------------------------------------------
// © Copyright 2021 European Space Agency, 2021
// This file is subject to the terms and conditions defined in file 'LICENSE.txt', which is part of this [source code/executable] package. No part of the package, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the file ‘LICENSE.txt’.
// -----------------------------------------------------------
import dayjs from "dayjs";
import _ from 'lodash'

/**
 * Get the loglevel from the search params
 */
const getParameterByName = <T>(name: string, url = window.location.href): T | null => {
    const searchParam = new URLSearchParams(new URL(url).search)
    const namedParam = searchParam.get(name)
    if (namedParam) {
        return namedParam as unknown as T
    }
    return null
}
//
const loggerConfig: { [key: string]: { logLevel: ILogLevel } } = {
    global: {
        logLevel: getParameterByName<ILogLevel>('loglevel') || 'error'
    },
    api: {
        logLevel: getParameterByName<ILogLevel>('api.loglevel') || 'info'
    },
    service: {
        logLevel: getParameterByName<ILogLevel>('service.loglevel') || 'info'
    },
    component: {
        logLevel: getParameterByName<ILogLevel>('component.loglevel') || 'info'
    },
    ui: {
        logLevel: getParameterByName<ILogLevel>('ui.loglevel') || 'info'
    },
}

export function overrideLogerConfig(override: Partial<typeof loggerConfig>){
    _.mergeWith(loggerConfig, override)
}

const logType = ['error', 'warn', 'info', 'debug'] as const;
type ILogLevel = typeof logType[number];
type ILoggerHandler = any;

const colors = {
    'error': '#f1666a',
    'warn': '#ffcc4e',
    'info': ' #00619E',
    'debug': '#00AE9D',
}
/**
 * logging interface, use it to abstract where we are logging in.
 * It will also format the logging
 */
export class Logger {

    private scope: string;
    private name: string;

    handlers: ILoggerHandler[] = [];

    // for testing purpose we put the config on the object so that we can alterate it within the test
    config = loggerConfig

    constructor(scope: string, name: string) {
        this.scope = scope;
        this.name = name;
        // by default we push the console in the list of handlers, could be good to add external providers
        this.handlers.push(console);
    }

    /**
     * Check that we have the good level of log setup
     * @param type type of log that should be done
     * @returns
     */
    _shouldLog(type: ILogLevel) {
        const logLevel = this.config[this.scope] ? this.config[this.scope].logLevel : this.config.global.logLevel;
        return logType.indexOf(type) <= logType.indexOf(logLevel);
    }

    /**
     * Do the log if needed, send the message formated to all the handlers
     * @param type Type of log
     * @param message message to log
     */
    _doLog(type: ILogLevel, message: string, arg: any) {
        if (this._shouldLog(type)) {
            const formattedType = [`%c${type.toUpperCase()}`, `color: white;background:${colors[type]};font-weight: bold; font-size:10px; padding:2px 6px; border-radius: 2px`]
            const formattedMessage = `${dayjs().format('YYYY-MM-DD-hh-mm-ss-sss')} (${this.scope}/${this.name}) ${this._sanitizeMessage(message)}`;
            this.handlers.forEach((handler) => {
                if (arg)
                    handler[type](...formattedType, formattedMessage, arg);
                else
                    handler[type](...formattedType, formattedMessage);
            })
        }
    }
    /**
     * Sanitize the message, in case we have something else than a string we apply stringification
     * @param message
     * @returns
     */
    _sanitizeMessage(message: string) {
        return typeof message != 'string' ? JSON.stringify(message) : message
    }

    debug(message: string, ...arg: any) {
        this._doLog('debug', message, arg)
    }

    info(message: string, ...arg: any) {
        this._doLog('info', message, arg)
    }

    warn(message: string, ...arg: any) {
        this._doLog('warn', message, arg)
    }

    error(message: string, ...arg: any) {
        this._doLog('error', message, arg)
    }
}
