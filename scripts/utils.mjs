/**
 * Escapes a string for use in Markdown.
 * @type {Array<[RegExp, string]>}
 */
const markdownEscapeItems = [
    [/\*/g, '\\*'], // Asterisks
    [/#/g, '\\#'], // Hashes
    [/\//g, '\\/'], // Slashes
    [/\(/g, '\\('], // Open parentheses
    [/\)/g, '\\)'], // Close parentheses
    [/\[/g, '\\['], // Open square brackets
    [/\]/g, '\\]'], // Close square brackets
    [/</g, '&lt;'], // Open angle brackets
    [/>/g, '&gt;'], // Close angle brackets
    [/_/g, '\\_'], // Underscores
    [/`/g, '\\`'], // Backticks
];

/**
 * Escapes a string for use in Markdown.
 * @param {string} str
 */
export const markdownEscape = (str) => {
    for (const [regex, replacement] of markdownEscapeItems) {
        str = str.replace(regex, replacement);
    }
    return str;
}

/**
 * Fancy colors for console output.
 * @type {Object<'debug' | 'info' | 'warning' | 'error | 'bold' | 'reset', string>}
 */
const colors = {
    debug: '\x1b[2m',
    info: '\x1b[36m',
    warning: '\x1b[33m',
    error: '\x1b[31m',
    bold: '\x1b[1m',
    reset: '\x1b[0m',
};

/**
 * Logs a message to the console with fancy colors.
 * @param {'debug' | 'info' | 'warning' | 'error'} type
 * @param {string} message
 * @param {...any} args
 */
export const fancyLog = (type, message, ...args) => {
    console.log(
        '%s%s[%s]%s%s %s%s',
        colors.bold,
        colors[type],
        type.toUpperCase(),
        colors.reset,
        colors[type],
        format(message, ...args),
        colors.reset,
    );
}

/**
 * Logging functions.
 * @property {(message: string, ...args: any[]) => void} debug
 * @property {(message: string, ...args: any[]) => void} info
 * @property {(message: string, ...args: any[]) => void} warning
 * @property {(message: string, ...args: any[]) => void} error
 */
export const logging = {
    /**
     * Logs an debug message.
     * @param {string} message
     * @param {...any} args
     */
    debug: (message, ...args) => fancyLog('debug', message, ...args),
    /**
     * Logs an info message.
     * @param {string} message
     * @param {...any} args
     */
    info: (message, ...args) => fancyLog('info', message, ...args),
    /**
     * Logs a warning message.
     * @param {string} message
     * @param {...any} args
     */
    warning: (message, ...args) => fancyLog('warning', message, ...args),
    /**
     * Logs an error message.
     * @param {string} message
     * @param {...any} args
     */
    error: (message, ...args) => fancyLog('error', message, ...args),
};


/**
 * Remove duplicates from an array.
 * @param {T[]} arr
 * @returns {T[]}
 */
export const removeDuplicates = (arr) => {
    return [...new Set(arr)];
}