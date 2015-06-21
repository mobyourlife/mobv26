var wildcards = require('./wildcards'),
    bower = './bower_components/';

var sass = {
    src: './assets/src/sass/',
    dist: './assets/dist/css/',
    includePaths: [
        bower + 'bootstrap-sass/assets/stylesheets/'
    ]
};

module.exports = {
    wildcards: wildcards,
    sass: sass
};