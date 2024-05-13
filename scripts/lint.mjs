#!/usr/bin/env node

/**
 * @fileoverview Provides linting for the project.
 */

import { readFile } from 'node:fs/promises';

import { logging } from './utils.mjs';
import {
    CORE_PATHS,
    checkGameEmbed,
    sectionsGetStartAndEnd,
    getTitle,
    getMarkdownFiles,
    parseAliases,
    parseReviewMetadata,
    parseGameEmbeds,
    SCRIPT_ALIASES_REGEX,
    SCRIPT_GENERATE_START,
    REVIEW_METADATA_REGEX
} from './core.mjs';
import { generateGameMetadata, generateLinks } from './generate.mjs';

const isGithubAnotationsMode = process.env['GITHUB_ACTIONS'] === 'true';

/**
 * Remove path prefix to the root directory.
 * @param {string} path The path to remove the root directory from.
 * @returns {string}
 */
const removeRootDir = path => {
    return path.replace(CORE_PATHS.rootDir + '/', '');
};

let hasBeenWarned = false;

/**
 * Logs a lint violation.
 * @param {'warning' | 'error'} type The type of violation.
 * @param {string | null} file The file path.
 * @param {number | null} line The line number.
 * @param {number | null} column The column number.
 * @param {string} message The violation message.
 */
const logLintViolation = (type = 'error', file, line, column, message) => {
    hasBeenWarned = true;
    if (isGithubAnotationsMode) {
        const args = [];
        file !== null && args.push(`file=${removeRootDir(file)}`);
        line !== null && args.push(`line=${line}`);
        column !== null && args.push(`col=${column}`);
        console.log('::%s %s::%s', type, args.join(','), message);
    } else {
        if (type === 'warning') {
            logging.warning('[%s%s] %s', file, line ? `:${line}` : '', message);
        } else {
            logging.error('[%s%s] %s', file, line ? `:${line}` : '', message);
        }
    }
};

/**
 * Check game embeds for linting issues.
 * @param {GameEmbed}
 */

/**
 * Checks a markdown file for linting issues.
 * @param {string} file The file path.
 */
const lintMarkdownFile = async file => {
    // Read the file
    /**
     * @type {[string, null] | [null, Error]}
     */
    const [content, error] = await readFile(file, 'utf-8')
        .then(data => [data, null])
        .catch(error => [null, error]);
    if (error) {
        logging.error('Failed to read file: %o', error);
        return;
    }
    if (content.includes('\r\n')) {
        logLintViolation(
            'warning',
            file,
            null,
            null,
            'File contains CRLF line endings, should be LF.'
        );
    }

    // Create an array of indexes for each line
    const lineIndexes = [0];
    for (let i = 0; i < content.length; i++) {
        if (content[i] === '\n') {
            lineIndexes.push(i + 1);
        }
    }

    // Check the title
    const [_0, titleError] = getTitle(content);
    if (titleError) {
        const error = {
            'not-found': 'Failed to find title in file.'
        };
        logLintViolation('error', file, 1, 1, error[titleError]);
    }

    /**
     * Find the line and column number from the index.
     * @param {number} index The index to find the line and column number for.
     * @returns {[number, number]}
     */
    const findLineAndColumn = index => {
        const line = lineIndexes.filter(i => i <= index).length;
        const column = index - lineIndexes[line - 1];
        return [line, column + 1];
    };

    // Check the line of the aliases (should be on second line)
    let reviewMetadataExpectedLine = 3;
    const aliasesMatch = SCRIPT_ALIASES_REGEX.exec(content);
    if (aliasesMatch !== null) {
        const [line, column] = findLineAndColumn(aliasesMatch.index);
        if (column !== 1) {
            logLintViolation(
                'warning',
                file,
                line,
                column,
                'Aliases should be on the first column.'
            );
        }
        if (line !== 2) {
            logLintViolation(
                'warning',
                file,
                line,
                column,
                'Aliases should be on the second line of the file.'
            );
        }

        // Update the expected line for the review metadata to be two lines after the aliases
        const [aliasesLine, _] = findLineAndColumn(
            aliasesMatch.index + aliasesMatch[0].length
        );

        reviewMetadataExpectedLine = aliasesLine + 2;
    }

    // Check the aliases
    const [_1, aliasesError] = parseAliases(content);
    if (aliasesError) {
        const error = {
            'not-found': 'Failed to find aliases in file.',
            'bad-json': 'Failed to parse aliases JSON in file.',
            'bad-json-format':
                'Aliases JSON in file is not an array of strings.'
        };
        logLintViolation(
            aliasesError === 'not-found' ? 'warning' : 'error',
            file,
            1,
            1,
            error[aliasesError]
        );
    }

    // Check the review metadata
    const reviewMetadataMatch = REVIEW_METADATA_REGEX.exec(content);
    if (reviewMetadataMatch !== null) {
        const [line, column] = findLineAndColumn(reviewMetadataMatch.index);
        if (column !== 1) {
            logLintViolation(
                'warning',
                file,
                line,
                column,
                'Review metadata should be on the first column.'
            );
        }
        if (line !== reviewMetadataExpectedLine) {
            logLintViolation(
                'warning',
                file,
                line,
                column,
                'Review metadata should be on the line after the aliases (line ' +
                    reviewMetadataExpectedLine +
                    ').'
            );
        } else {
            // Make sure the line before the review metadata is empty
            const previousLineIndex = lineIndexes[line - 2];
            if (
                content
                    .slice(previousLineIndex, lineIndexes[line - 1])
                    .trim() !== ''
            ) {
                logLintViolation(
                    'warning',
                    file,
                    line - 1,
                    1,
                    'Line before review metadata should be empty.'
                );
            }
        }
    }

    // Check the review metadata
    const [_2, reviewMetadataError] = parseReviewMetadata(content);
    if (reviewMetadataError) {
        const error = {
            'not-found':
                'Failed to find review metadata in file. (Might be because it is the wrong format.)'
        };
        logLintViolation('error', file, 1, 1, error[reviewMetadataError]);
    }

    // Game embeds should be on the last line
    const [gameEmbedsMatch, gameEmbedsMatchError] = parseGameEmbeds(content);
    if (gameEmbedsMatchError && gameEmbedsMatchError !== 'not-found') {
        logLintViolation(
            'warning',
            file,
            null,
            null,
            'Multiple game embeds found in file.'
        );
    } else if (gameEmbedsMatch !== null) {
        const [embed, position] = gameEmbedsMatch;
        const [line, column] = findLineAndColumn(position);
        if (column !== 1) {
            logLintViolation(
                'warning',
                file,
                line,
                column,
                'Game embeds should be on the first column.'
            );
        }
        if (line !== lineIndexes.length - 1) {
            logLintViolation(
                'warning',
                file,
                line,
                column,
                'Game embeds should be on the second last line of the file. (Line ' +
                    (lineIndexes.length - 1) +
                    ')'
            );
        }

        // Check the game embeds is not invalid
        const [isValid, gameEmbedsError] = await checkGameEmbed(embed);
        if (!isValid) {
            const error = {
                'invalid-embed': 'Invalid game embed found in file.',
                'web-request-failed': 'Failed to fetch game embed data.'
            };
            logLintViolation(
                'error',
                file,
                line,
                column,
                error[gameEmbedsError]
            );
        }
    }

    // There should be a trailing newline with no content
    if (lineIndexes[lineIndexes.length - 1] !== content.length) {
        logLintViolation(
            'warning',
            file,
            lineIndexes.length,
            1,
            'File should end with a newline.'
        );
    }
};

/**
 * Main function.
 * @returns {Promise<number>}
 */
const main = async () => {
    logging.info('Linting files...');

    // First lint the SUMMARY.md file
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

    // Games metadata
    const [gameData, gameDataError] = await generateGameMetadata();

    // Check if the SUMMARY.md file contains the correct sections
    const [summarySections, summarySectionsError] =
        sectionsGetStartAndEnd(summaryFile);
    if (summarySectionsError) {
        const error = {
            'not-found': 'Failed to find start and end sections in SUMMARY.md.',
            'invalid-position':
                'End section comes before start section in SUMMARY.md.'
        };
        logLintViolation(
            'error',
            CORE_PATHS.summaryFile,
            null,
            null,
            error[summarySectionsError]
        );
    } else if (!gameDataError) {
        const [start, end] = summarySections;
        // Slice at these indexes to get the content between the sections
        const contentBetweenSections = summaryFile.slice(
            start + SCRIPT_GENERATE_START.length,
            end
        );
        // Check if the content between the sections is up to date
        const expectedContent = generateLinks(gameData);
        if (contentBetweenSections !== expectedContent) {
            logLintViolation(
                'error',
                CORE_PATHS.summaryFile,
                null,
                null,
                'SUMMARY.md content is out of date.'
            );
        }
    }

    // Lint all markdown files in the game-support directory
    const [markdownFiles, markdownFilesError] = await getMarkdownFiles();
    if (markdownFilesError) {
        return 1;
    }

    await Promise.all(markdownFiles.map(file => lintMarkdownFile(file)));

    return hasBeenWarned ? 1 : 0;
};

if (process.argv[1] === new URL(import.meta.url).pathname)
    main().then(code => process.exit(code));
