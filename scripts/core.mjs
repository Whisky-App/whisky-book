/**
 * @fileoverview Core shared functions between linting and generation.
 */
import { readdir } from 'node:fs/promises';
import { getDirName, logging } from './utils.mjs';
import { resolve } from 'node:path';
import { request } from 'node:https';

/**
 * Core directory paths.
 * @property {string} rootDir
 * @property {string} srcDir
 * @property {string} gameSupportDir
 * @property {string} summaryFile
 * @property {string} gamesJsonFile
 * @readonly
 */
export const CORE_PATHS = {
    rootDir: resolve(getDirName(), '..'),
    srcDir: resolve(getDirName(), '..', 'src'),
    gameSupportDir: resolve(getDirName(), '..', 'src', 'game-support'),
    summaryFile: resolve(getDirName(), '..', 'src', 'SUMMARY.md'),
    gamesJsonFile: resolve(getDirName(), '..', 'src', 'games.json')
};

export const SCRIPT_GENERATE_START = '<!-- script:Generate Start -->';
export const SCRIPT_GENERATE_END = '<!-- script:Generate End -->';

/**
 * Gets the start and end sections of a file.
 * @param {string} content
 * @returns {[[number, number], null] | [null, 'not-found' | 'invalid-position']}
 */
export const sectionsGetStartAndEnd = content => {
    // The start and end sections both need to be present
    const startMatch = content.indexOf(SCRIPT_GENERATE_START);
    const endMatch = content.indexOf(SCRIPT_GENERATE_END);
    if (startMatch === -1 || endMatch === -1) {
        logging.debug('Failed to find start or end section in file.');
        return [null, 'not-found'];
    }

    // The end section must come after the start section
    if (startMatch > endMatch) {
        logging.debug('End section comes before start section in file.');
        return [null, 'invalid-position'];
    }

    // Get the start and end sections
    return [[startMatch, endMatch], null];
};

export const TITLES_REGEX = /^# (.+)/;

/**
 * Gets the title of a file.
 * @param {string} content
 * @returns {[string, null] | [null, 'not-found']}
 */
export const getTitle = content => {
    // Match the title
    const titleMatch = content.match(TITLES_REGEX);
    if (!titleMatch || titleMatch.length < 2) {
        logging.debug('Failed to find title in file.');
        return [null, 'not-found'];
    }

    return [titleMatch[1], null];
};

export const SCRIPT_ALIASES_REGEX = /<!-- script:Aliases ([\s\S]+?) -->/;

/**
 * Parse aliases from a file.
 * @param {string} content
 * @returns {[string[], null] | [null, 'not-found' | 'bad-json' | 'bad-json-format']}
 */
export const parseAliases = content => {
    // Match the aliases section
    const aliasesMatch = content.match(SCRIPT_ALIASES_REGEX);
    if (!aliasesMatch || aliasesMatch.length < 2) {
        logging.debug('Failed to find aliases section in file.');
        return [null, 'not-found'];
    }

    // Parse the aliases
    let [aliasesParsed, aliasesError] = (() => {
        try {
            return [JSON.parse(aliasesMatch[1]), null];
        } catch (error) {
            logging.debug('Failed to parse aliases section in file: %o', error);
            return [null, error];
        }
    })();
    if (aliasesError) {
        return [null, 'bad-json'];
    }
    if (
        !aliasesParsed ||
        !Array.isArray(aliasesParsed) ||
        !aliasesParsed.every(alias => typeof alias === 'string')
    ) {
        logging.debug(
            'Failed to parse aliases section in file: not an array of strings.'
        );
        return [null, 'bad-json-format'];
    }

    return [aliasesParsed, null];
};

export const REVIEW_METADATA_REGEX =
    /{{#template \.\.\/templates\/rating.md status=(Platinum|Gold|Silver|Bronze|Garbage) installs=(Yes|No) opens=(Yes|No)}}/;

/**
 * @typedef {'Platinum' | 'Gold' | 'Silver' | 'Bronze' | 'Garbage'} RatingStatus
 */

/**
 * Parse rating information from a file.
 * @param {string} content
 * @returns {[{
 *  status: RatingStatus,
 *  installs: 'Yes' | 'No',
 *  opens: 'Yes' | 'No',
 * }, null] | [null, 'not-found']
 */
export const parseReviewMetadata = content => {
    // Match the rating section
    const ratingMatch = content.match(REVIEW_METADATA_REGEX);
    if (!ratingMatch || ratingMatch.length < 4) {
        logging.debug('Failed to find rating section in file.');
        return [null, 'not-found'];
    }

    const status = ratingMatch[1];
    const installs = ratingMatch[2];
    const opens = ratingMatch[3];

    return [
        {
            status,
            installs,
            opens
        },
        null
    ];
};

export const GAMES_EMBEDS_METADATA = {
    steam: /{{#template ..\/templates\/steam.md id=(\d+)}}/
};

/**
 * @typedef {{
 *     type: 'steam',
 *     id: number,
 * }} GameEmbed
 */

/**
 * Get game embeds from a file.
 * @param {string} content
 * @returns {[[GameEmbed, number] | null, 'not-found' | 'multiple-found']}
 *
 */
export const parseGameEmbeds = content => {
    // Match the game embeds section
    /**
     * @type {{
     *    location: number,
     *    embed: GameEmbed
     * }[]}
     */
    const embeds = [];
    for (const [type, regex] of Object.entries(GAMES_EMBEDS_METADATA)) {
        const match = content.match(regex);
        if (match && match.length > 1) {
            embeds.push({
                location: match.index,
                embed: {
                    type,
                    id: parseInt(match[1])
                }
            });
        }
    }

    if (embeds.length === 0) {
        logging.debug('Failed to find game embeds section in file.');
        return [null, 'not-found'];
    }
    if (embeds.length > 1) {
        logging.debug('Found multiple game embeds section in file.');
        return [null, 'multiple-found'];
    }

    return [[embeds[0].embed, embeds[0].location], null];
};

/**
 * Use webservers to check that a GameEmbed is valid.
 * @param {GameEmbed} embed
 * @returns {Promise<[boolean, null] | [null, 'invalid-embed' | 'web-request-failed']>}
 */
export const checkGameEmbed = async embed => {
    if (embed.type === 'steam') {
        const steamUrl =
            'https://store.steampowered.com/app/' +
            encodeURIComponent(embed.id);
        const url = new URL(steamUrl);
        /**
         * @type {import('http').IncomingMessage}
         */
        const [response, responseError] = await new Promise(resolve => {
            request(
                {
                    hostname: url.hostname,
                    port: 443,
                    path: url.pathname,
                    method: 'GET',
                    headers: {
                        'User-Agent': 'WhiskyBookBot/1.0'
                    }
                },
                resolve
            ).end();
        })
            .then(response => [response, null])
            .catch(error => [null, error]);
        if (responseError) {
            logging.debug('Failed to request Steam URL: %o', responseError);
            return [null, 'web-request-failed'];
        }

        return [response.statusCode === 200, null];
    }

    return [false, 'invalid-embed'];
};

const FILES_SKIP = ['README.md', 'template.md'];

/**
 * Gets all markdown files in the game-support directory.
 * @returns {Promise<[string[], null] | [null, 'failed-to-read-dir']>}
 */
export const getMarkdownFiles = async () => {
    const [gameSupportDirFiles, gameSupportDirFilesError] = await readdir(
        CORE_PATHS.gameSupportDir,
        { withFileTypes: true }
    )
        .then(files => [files, null])
        .catch(error => [null, error]);
    if (gameSupportDirFilesError) {
        logging.error(
            'Failed to read game-support directory: %o',
            gameSupportDirFilesError
        );
        return [null, 'failed-to-read-dir'];
    }

    return [
        gameSupportDirFiles
            .filter(
                file =>
                    file.isFile() &&
                    file.name.endsWith('.md') &&
                    !FILES_SKIP.includes(file.name)
            )
            .map(file => resolve(CORE_PATHS.gameSupportDir, file.name)),
        null
    ];
};
