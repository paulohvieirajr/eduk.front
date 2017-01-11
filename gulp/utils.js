'use strict';

var fs = require('fs');

module.exports =  {
    endsWith : endsWith,
    parseVersion : parseVersion,
    isLintFixed : isLintFixed
}

function endsWith(str, suffix) {
    return str.indexOf('/', str.length - suffix.length) !== -1;
};

var parseString = require('xml2js').parseString;
// return the version number from `pom.xml` file
function parseVersion() {
    var version;
    var pomXml = fs.readFileSync('pom.xml', 'utf8');
    parseString(pomXml, function (err, result) {
        if (result.project.version && result.project.version[0]) {
            version = result.project.version[0];
        } else if (result.project.parent && result.project.parent[0] && result.project.parent[0].version && result.project.parent[0].version[0]) {
            version = result.project.parent[0].version[0];
        } else {
            //throw new Error('pom.xml is malformed. No version is defined');
            console.log('Error');
        }
    });
    return version;
}


function isLintFixed(file) {
	// Has ESLint fixed the file contents?
	return file.eslint !== null && file.eslint.fixed;
}