#!/usr/bin/env node 
/**
 * Generates a SUMMARY.md file for rust book.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'node:util';

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
const markdownEscape = (str) => {
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
const fancyLog = (type, message, ...args) => {
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
 * @type {Object<'debug' | 'info' | 'warning' | 'error', (message: string, ...args: any[]) => void>}
 */
const logging = {
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

const SCRIPT_GENERATE_START = '<!-- script:Generate Start -->';
const SCRIPT_GENERATE_END = '<!-- script:Generate End -->';
// After the aliases start, we will find a json array of aliases (match everything until the closing comment)
const SCRIPT_ALIASES_REGEX = /<!-- script:Aliases (.+?) -->/s;
const GAME_SUPPORT_DIR = 'game-support';
const INDEX_FILE = 'README.md';
const GAMES_OUT_FILE = 'games.json';
const FILES_SKIP = ['README.md', 'template.md'];

/**
 * Gets the start and end sections of a file.
 * @param {string} content
 * @returns {[string | null, string | null]}
 */
const getStartAndEndSections = (content) => {
    if (
        content.split(SCRIPT_GENERATE_START).length !== 2 ||
        content.split(SCRIPT_GENERATE_END).length !== 2
    ) {
        return [null, null];
    }

    const [start, replaceAndEnd] = content.split(SCRIPT_GENERATE_START);
    const [_, end] = replaceAndEnd.split(SCRIPT_GENERATE_END);
    return [start, end];
}

/**
 * Main function.
 * @returns {Promise<number>}
 */
const main = async () => {
    logging.info('Generating SUMMARY.md...');
    // Get local file paths
    const dirName = resolve(dirname(fileURLToPath(import.meta.url)), '../', 'src');
    const summaryFilePath = resolve(dirName, 'SUMMARY.md');
    const indexFilePath = resolve(dirName, 'game-support', INDEX_FILE);
    const gameSupportDirPath = resolve(dirName, GAME_SUPPORT_DIR);
    const gamesOutFilePath = resolve(dirName, GAMES_OUT_FILE);

    // Read the SUMMARY.md file
    const [summaryFileContent, summaryFileReadError] = await readFile(summaryFilePath, 'utf-8')
        .then((data) => [data, null])
        .catch((error) => [null, error]);
    if (summaryFileReadError) {
        logging.error('Failed to read SUMMARY.md: %o', summaryFileReadError);
        return 1;
    }
    const [summaryFileStart, summaryFileEnd] = getStartAndEndSections(summaryFileContent);
    if (!summaryFileStart === null || !summaryFileEnd === null) {
        logging.error('Failed to find start and end sections in SUMMARY.md.');
        return 1;
    }

    // Read the index file
    const [indexFileContent, indexFileReadError] = await readFile(indexFilePath, 'utf-8')
        .then((data) => [data, null])
        .catch((error) => [null, error]);
    if (indexFileReadError) {
        logging.error('Failed to read index file: %o', indexFileReadError);
        return 1;
    }
    const [indexFileStart, indexFileEnd] = getStartAndEndSections(indexFileContent);
    if (!indexFileStart === null || !indexFileEnd === null) {
        logging.error('Failed to find start and end sections in index file.');
        return 1;
    }

    // Get all files in the game-support directory
    const [gameSupportDirFiles, gameSupportDirFilesError] = await readdir(gameSupportDirPath, { withFileTypes: true })
        .then((files) => [files, null])
        .catch((error) => [null, error]);
    if (gameSupportDirFilesError) {
        logging.error('Failed to read game-support directory: %o', gameSupportDirFilesError);
        return 1;
    }

    // Filter out directories and non-markdown files
    const markdownFiles = gameSupportDirFiles
        .filter((file) => file.isFile() && file.name.endsWith('.md') && !FILES_SKIP.includes(file.name));

    // For all, generate a markdown link
    /**
     * @type {Array<{name: string, path: string, title: string, aliases: string[]}>}
     */
    const links = [];
    for (const file of markdownFiles) {
        // Read the file
        const filePath = resolve(gameSupportDirPath, file.name);
        const [fileContent, fileReadError] = await readFile(filePath, 'utf-8')
            .then((data) => [data, null])
            .catch((error) => [null, error]);
        if (fileReadError) {
            logging.error('Failed to read file %s: %o', filePath, fileReadError);
            return 1;
        }

        // Get the title
        const titleMatch = fileContent.match(/^# (.+)$/m);
        if (!titleMatch || titleMatch.length < 2) {
            logging.warning('Failed to find title in file %s. "%s" will be skipped.', filePath, file.name);
            continue;
        }

        // Add the link
        const title = titleMatch[1];

        // Look for aliases
        const aliasesMatch = fileContent.match(SCRIPT_ALIASES_REGEX);
        if (!aliasesMatch || aliasesMatch.length < 2) {
            links.push({
                name: file.name,
                title,
                aliases: [],
            });
            continue;
        }

        let [aliasesParsed, aliasesError] = (() => {
            try {
                return [JSON.parse(aliasesMatch[1]), null];
            } catch (error) {
                return [null, error];
            }
        })();
        if (aliasesError) {
            logging.warning('Failed to parse aliases in file %s: %o', filePath, aliasesError);
        }
        if (!aliasesParsed || !Array.isArray(aliasesParsed) || !aliasesParsed.every((alias) => typeof alias === 'string')) {
            logging.warning('Invalid aliases in file %s: %o', filePath, aliasesParsed);
            aliasesParsed = null;
        }

        // Remove duplicates
        const dupeMap = new Map();
        let aliases = (aliasesParsed ?? []).map((alias) => alias.toLocaleLowerCase());
        aliases.push(title.toLocaleLowerCase());
        aliases = aliases.filter((alias) => {
            if (dupeMap.has(alias)) {
                return false;
            }
            dupeMap.set(alias, true);
            return true;
        });

        links.push({
            name: file.name,
            title,
            aliases
        });
    }

    // Write the new SUMMARY.md file
    const newSummaryFileContent = [
        summaryFileStart,
        SCRIPT_GENERATE_START,
        '\n',
        links.map((link) => {
            return `  - [${markdownEscape(link.title)}](./${GAME_SUPPORT_DIR}/${encodeURIComponent(link.name)})`;
        }).join('\n'),
        '\n',
        SCRIPT_GENERATE_END,
        summaryFileEnd,
    ].join('');
    const [_a, writeError] = await writeFile(summaryFilePath, newSummaryFileContent)
        .then(() => [null, null])
        .catch((error) => [null, error]);
    if (writeError) {
        logging.error('Failed to write SUMMARY.md: %o', writeError);
        return 1;
    }
    logging.info('SUMMARY.md generated successfully.');

    // Write the new index file
    const newIndexFileContent = [
        indexFileStart,
        SCRIPT_GENERATE_START,
        '\n',
        links.map((link) => {
            return `- [${markdownEscape(link.title)}](./${encodeURIComponent(link.name)})`;
        }).join('\n'),
        '\n',
        SCRIPT_GENERATE_END,
        indexFileEnd,
    ].join('');
    const [_b, writeIndexError] = await writeFile(indexFilePath, newIndexFileContent)
        .then(() => [null, null])
        .catch((error) => [null, error]);
    if (writeIndexError) {
        logging.error('Failed to write index file: %o', writeIndexError);
        return 1;
    }
    logging.info('Index file generated successfully.');

    // Write the games.json file
    const gamesOutFileContent = JSON.stringify(links.map((link) => {
        return {
            url: `/${GAME_SUPPORT_DIR}/${encodeURIComponent(basename(link.name) + '.html')}`,
            title: link.title,
            aliases: link.aliases,
        };
    }), null, 2);
    const [_c, writeGamesError] = await writeFile(gamesOutFilePath, gamesOutFileContent)
        .then(() => [null, null])
        .catch((error) => [null, error]);
    if (writeGamesError) {
        logging.error('Failed to write games.json: %o', writeGamesError);
        return 1;
    }
    logging.info('games.json generated successfully.');

    return 0;
};

main().then((code) => process.exit(code));