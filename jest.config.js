

isDevelopment = process.env.NODE_ENV === 'development';

let config = {
    verbose: true,
    testURL: 'http://localhost/',
    collectCoverage: isDevelopment ? true : false,
    collectCoverageFrom: ['/app/**/*.js'],
    coverageDirectory: 'coverage',
};

module.exports = config;