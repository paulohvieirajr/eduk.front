var gulp = require('gulp'),
    util = require('./utils'),
    url = require('url'),
    browserSync = require('browser-sync'),
    proxy = require('proxy-middleware');
var historyApiFallback = require('connect-history-api-fallback')

var config = require('./config');

module.exports = function () {
    var baseUri = config.uri + config.apiPort;
    // Routes to proxy to the backend. Routes ending with a / will setup
    // a redirect so that if accessed without a trailing slash, will
    // redirect. This is required for some endpoints for proxy-middleware
    // to correctly handle them.
    var proxyRoutes = [
        '/api'
    ];

    var requireTrailingSlash = proxyRoutes.filter(function (r) {
        return util.endsWith(r, '/');
    }).map(function (r) {
        // Strip trailing slash so we can use the route to match requests
        // with non trailing slash
        return r.substr(0, r.length - 1);
    });

    var proxies = [
        // Ensure trailing slash in routes that require it
        function (req, res, next) {
            requireTrailingSlash.forEach(function (route){
                if (url.parse(req.url).path === route) {
                    res.statusCode = 301;
                    res.setHeader('Location', route + '/');
                    res.end();
                }
            });

            next();
        }
    ]
    .concat(
        proxyRoutes.map(function (r) {
            var options = url.parse(baseUri + r);
            options.route = r;
            options.preserveHost = true;
            return proxy(options);
        }));
    var proxyOptions = url.parse('http://localhost:8080/api');
    proxyOptions.route = '/api';
    browserSync({
        open: false,
        port: config.port,
        server: {
            baseDir: config.app,
            middleware: [historyApiFallback(), proxy(proxyOptions)]
        }
    });

    gulp.start('watch');
}
