'use strict';

const os = require('os');
const config = require('app/config/config');
const restify = require('restify');
const CookieParser = require('restify-cookies');

process.on('uncaughtException', function (err) {
    console.error(err);
    process.exit(1);
});

/**Initialize web service.**/
let server = restify.createServer({
    name: 'SPA App',
    versions: ['1.0.0']
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());

server.use(restify.plugins.bodyParser({
    // this should supposedly limit maximum upload size to 10 KiB
    maxBodySize: config.web.max_upload_size,
    mapParms: true,
    mapFiles: true,
    keepExtensions: true,
    uploadDir: os.tmpdir()
}));

server.use(CookieParser.parse);

server.use(restify.plugins.throttle({
    burst: config.web.throttle_burst,
    rate: config.web.throttle_rate,
    ip: true,   // throttle per IP
}));

server.use(restify.plugins.requestLogger());
server.get('/*', restify.plugins.serveStatic({
    directory: './public',
    default: 'index.html'
}));

server.listen(config.web.port, '0.0.0.0', function () {
});

module.exports = server;
