#!/usr/bin/env node
/**
 * @fileoverview Generates the SUMMARY.md and games.json files.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { extname, basename } from 'node:path';

import {
    markdownEscape,
    logging,
    removeDuplicates,
    getLastUpdated
} from './utils.mjs';
import {
    CORE_PATHS,
    sectionsGetStartAndEnd,
    getMarkdownFiles,
    getTitle,
    parseAliases,
    parseReviewMetadata,
    parseGameEmbeds,
    SCRIPT_GENERATE_START,
    SCRIPT_GENERATE_END
} from './core.mjs';

/**
 * @typedef {import('./core.mjs').GameEmbed} GameEmbed
 * @typedef {import('./core.mjs').RatingStatus} RatingStatus
 */

/**
 * @typedef {{
 *     title: string,
 *     lastUpdated: Date,
 *     aliases: string[],
 *     rating: {
 *        status: RatingStatus,
 *        installs: boolean,
 *        opens: boolean,
 *     },
 *     embed: GameEmbed | null,
 * }} GameMetadata
 */

/**
 * Generate GameMetadata for every game.
 * @returns {Promise<[{
 *     path: string,
 *     game: GameMetadata,
 * }[], null] | [null, 'folder-read-error']>}
 */
export const generateGameMetadata = async () => {
    const [markdownFiles, markdownFilesError] = await getMarkdownFiles();
    if (markdownFilesError) {
        logging.error('Failed to get markdown files: %s', markdownFilesError);
        return [null, 'folder-read-error'];
    }

    /**
     * @type {{
     *    path: string,
     *    game: GameMetadata,
     * }[]}
     */
    const links = [];
    for (const file of markdownFiles) {
        // Read the file
        /**
         * @type {[string, null] | [null, Error]}
         */
        const [fileContent, fileContentError] = await readFile(file, 'utf-8')
            .then(data => [data, null])
            .catch(error => [null, error]);
        if (fileContentError) {
            logging.error(
                'Failed to read file %s: %o',
                filePath,
                fileContentError
            );
            continue;
        }

        // Get the title
        const [title, titleError] = getTitle(fileContent);
        if (titleError) {
            logging.warning(
                'Failed to get title in file %s: %s',
                filePath,
                titleError
            );
            continue;
        }

        // Look for aliases
        const [aliasesParsed, aliasesError] = parseAliases(fileContent);
        if (aliasesError && aliasesError !== 'not-found') {
            logging.error(
                'Failed to parse aliases in file %s: %s',
                filePath,
                aliasesError
            );
            continue;
        }

        const aliases = removeDuplicates(
            [...(aliasesParsed ?? []), title].map(alias => alias.toLowerCase())
        );

        // Look for rating
        const [ratingParsed, ratingError] = parseReviewMetadata(fileContent);
        if (ratingError) {
            logging.error(
                'Failed to parse rating in file %s: %s',
                filePath,
                ratingError
            );
            continue;
        }

        // Look for embed
        const [embedData, embedError] = parseGameEmbeds(fileContent);
        if (embedError && embedError !== 'not-found') {
            logging.error(
                'Failed to parse embed in file %s: %s',
                filePath,
                embedError
            );
            continue;
        }
        const embed = embedData && embedData.length > 0 ? embedData[0] : [];

        // Look for last updated
        const [lastUpdated, lastUpdatedError] = getLastUpdated(file);
        if (lastUpdatedError) {
            logging.error(
                'Failed to get last updated in file %s: %s',
                file,
                lastUpdatedError
            );
            continue;
        }

        links.push({
            path: file,
            game: {
                title,
                lastUpdated,
                aliases,
                rating: {
                    status: ratingParsed.status,
                    installs: ratingParsed.installs === 'Yes',
                    opens: ratingParsed.opens === 'Yes'
                },
                embed: embedError ? null : embed
            }
        });
    }

    return [links, null];
};

/**
 * Generate the sidebar links.
 * @param {{
 *     path: string,
 *     game: GameMetadata
 * }[]} links
 * @returns {string}
 */
export const generateLinks = links => {
    return (
        '\n' +
        links
            .map(link => {
                return `  - [${markdownEscape(
                    link.game.title
                )}](/game-support/${encodeURIComponent(basename(link.path))})`;
            })
            .join('\n') +
        '\n'
    );
};

/**
 * Generate the games.json file.
 * @param {{
 *     path: string,
 *     game: GameMetadata
 * }[]} links
 * @returns {string}
 */
export const generateGamesJson = links => {
    return JSON.stringify(
        links.map(link => {
            // Strip the extension
            const name = basename(link.path);
            const ext = extname(name);
            const base = name.slice(0, -ext.length);
            return {
                url: `/game-support/${encodeURIComponent(base + '.html')}`,
                title: link.game.title,
                aliases: link.game.aliases,
                lastUpdated: link.game.lastUpdated.toISOString(),
                rating: {
                    status: link.game.rating.status,
                    installs: link.game.rating.installs,
                    opens: link.game.rating.opens
                },
                embed: link.game.embed
            };
        }),
        null,
        2
    );
};

/**
 * Main function.
 * @returns {Promise<number>}
 */
const main = async () => {
    logging.info('Generating SUMMARY.md and games.json...');
    const [gameData, gameDataError] = await generateGameMetadata();
    if (gameDataError) {
        return 1;
    }

    // Get the SUMMARY.md file
    /**
     * @type {[string, null] | [null, Error]}
     */
    const [summaryFile, summaryFileError] = await readFile(
        CORE_PATHS.summaryFile,
        'utf-8'
    )
        .then(data => [data, null])
        .catch(error => [null, error]);
    if (summaryFileError) {
        logging.error('Failed to read SUMMARY.md: %o', summaryFileError);
        return 1;
    }

    // Get the start and end of the SUMMARY.md file
    const [summarySections, summarySectionsError] =
        sectionsGetStartAndEnd(summaryFile);
    if (summarySectionsError) {
        logging.error('Failed to find start and end sections in SUMMARY.md.');
        return 1;
    }
    const [start, end] = summarySections;

    // Write the new SUMMARY.md file
    const newSummaryFileContent = [
        summaryFile.slice(0, start),
        SCRIPT_GENERATE_START,
        generateLinks(gameData),
        SCRIPT_GENERATE_END,
        summaryFile.slice(end + SCRIPT_GENERATE_END.length)
    ].join('');
    /**
     * @type {[string, null] | [null, Error]}
     */
    const [_1, writeError] = await writeFile(
        CORE_PATHS.summaryFile,
        newSummaryFileContent
    )
        .then(() => [null, null])
        .catch(error => [null, error]);
    if (writeError) {
        logging.error('Failed to write SUMMARY.md: %o', writeError);
        return 1;
    }

    logging.info('SUMMARY.md generated successfully.');

    // Write the games.json file
    const [_3, writeGamesError] = await writeFile(
        CORE_PATHS.gamesJsonFile,
        generateGamesJson(gameData)
    )
        .then(() => [null, null])
        .catch(error => [null, error]);
    if (writeGamesError) {
        logging.error('Failed to write games.json: %o', writeGamesError);
        return 1;
    }
    logging.info('games.json generated successfully.');

    return 0;
};

// Check if this is the file that is being run
if (process.argv[1] === new URL(import.meta.url).pathname)
    main().then(code => process.exit(code));
