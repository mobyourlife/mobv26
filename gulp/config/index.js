var wildcards = require('./wildcards');

var sass = {
    src: './assets/src/sass/',
    dist: './assets/dist/css/',
    includePaths: [
        './lib/bootstrap/assets/stylesheets/'
    ]
};

module.exports = {
    wildcards: wildcards,
    sass: sass
};