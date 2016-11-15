'use strict';

// CONFIG

var basePaths = {
	src: '',
	dest: 'dist/',
	bower: 'bower_components/'
};

var paths = {
	images: {
        src: basePaths.src + 'img/',
        dest: basePaths.dest + 'img/'
    },
    fonts: {
        src: basePaths.src + 'fonts/',
        dest: basePaths.dest + 'fonts/'
    },
    favicon: {
        src: basePaths.src + 'favicon/',
        dest: basePaths.dest + 'favicon/'
    },
    scripts: {
        src: basePaths.src + 'js/',
        dest: basePaths.dest + 'js/'
    },
    styles: {
        src: basePaths.src + 'css/',
        dest: basePaths.dest + 'css/'
    },
    vendors: {
        src: basePaths.bower + '**/',
        dest: basePaths.dest + 'js/'
    },
    vendorCss: {
        src: basePaths.bower + '**/',
        dest: basePaths.dest + 'css/'
    }
};

var appFiles = {
    styles: paths.styles.src + '*.css',
    scripts: paths.scripts.src + '*.js'
};

var vendorFiles = {
    styles: [
        paths.vendorCss.src + 'dist/**/*.css',
        '!' + paths.vendorCss.src + 'dist/**/*.min.css',
        '!' + paths.vendorCss.src + 'dist/**/*-theme.css'
    ],
    scripts: [
        paths.vendors.src + 'dist/jquery.js',
        paths.vendors.src + 'angular.js',
        paths.vendors.src + 'match-media.js',
        paths.vendors.src + 'dist/lodash.js',
        paths.vendors.src + 'dist/angular-simple-logger.js',
        paths.vendors.src + 'angular-google-maps.js',
        paths.vendors.src + 'dist/js/bootstrap.js',
        paths.vendors.src + 'dist/js/material.js',
        paths.vendors.src + 'dist/js/ripples.js',
        paths.vendors.src + 'dist/wow.js',
        paths.vendors.src + 'dist/jquery.scrollUp.js',
        paths.vendors.src + 'jquery.nav.js',
    ]
};

var imageFiles = {
    images: paths.images.src + '*.*',
    fonts: paths.fonts.src + '*.*',
    favicon: paths.favicon.src + '*.png'
};

// LET'S GULP

var gulp = require('gulp');
var gutil = require('gulp-util');
var streamqueue = require('streamqueue');
var es = require('event-stream');
var sourcemaps = require('gulp-sourcemaps');
var print = require('gulp-print');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var jshint = require('gulp-jshint');
var minify = require('gulp-uglify');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var htmlify = require('gulp-angular-htmlify');
var htmlmin = require('gulp-htmlmin');

var maincss = streamqueue({ objectMode: true },
    gulp.src(vendorFiles.styles),
    gulp.src(appFiles.styles).pipe(autoprefixer()))
        .pipe(print())
        .pipe(concat('bundle.css'))
        .pipe(cssmin())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(paths.vendorCss.dest));

vendorFiles.scripts.push(appFiles.scripts);

var appjs = gulp.src(vendorFiles.scripts)
        .pipe(print())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('app.js'))
        .pipe(minify().on('error', gutil.log))
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.write('source-maps'))
        .pipe(gulp.dest(paths.vendors.dest));

// var script = gulp.src(appFiles.scripts)
//         .pipe(sourcemaps.init({loadMaps: true}))
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
//         .pipe(minify().on('error', gutil.log))
//         .pipe(rename('main.min.js'))
//         .pipe(sourcemaps.write('source-maps'))
//         .pipe(gulp.dest(paths.scripts.dest));

gulp.task('copyimg', function() {
    gulp.src(imageFiles.images)
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task('copyfont', function() {
    gulp.src(imageFiles.fonts)
        .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('copyfav', function() {
    gulp.src(imageFiles.favicon)
        .pipe(gulp.dest(paths.favicon.dest));
});

gulp.task('htmlmin', function() {
      gulp.src('index.html')
        .pipe(inject(es.merge([appjs, maincss]), {ignorePath: 'dist/', addRootSlash: false}))
        .pipe(htmlify({
            customPrefixes: ['ui-', 'ios-', 'center', 'zoom', 'options', 'template', 'position', 'controller', 'index', 'idKey', 'coords']
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['copyimg', 'copyfont', 'copyfav', 'htmlmin']);
