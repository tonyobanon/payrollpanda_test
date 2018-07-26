'use strict';
/**
 * Externalised configuration represented as a valid JSON structure, resolving to environment variables.
 * @see dependent config.js and README.md for the exports.
 * @type {object}
 */

const $ = {
    web: {
        port: process.env.WEB_PORT || 8080,
        session_duration: parseInt(process.env.WEB_SESSION_DURATION) || 60 * 60 * 24 * 3,
        throttle_burst: parseInt(process.env.WEB_THROTTLE_BURST) || 10,
        throttle_rate: parseInt(process.env.WEB_THROTTLE_RATE) || 5,
        max_upload_size: parseInt(process.env.WEB_MAX_UPLOAD_SIZE) || 2048000
    }
};

module.exports = $;
