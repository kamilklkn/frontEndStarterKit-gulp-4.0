"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require("gulp-sass");
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const critical = require('critical').stream;


// Banner için package.json yükle
const pkg = require('./package.json');

// Banner içeriğini package.json'dan ayarla
const banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/kamilklkn/<%= pkg.name %>/blob/master/LICENSE)\n',
    ' */\n',
    '\n'
].join('');

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./www/"
        },
        port: 8080
    });
    done();
}


// BrowserSync reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean vendor
function clean() {
    return del(["./vendor/"]);
    return del(["./www/"]);
}

// Üçüncü taraf bağımlılıklarını node_modules'dan vendor dizinine getirin
function modules() {
    // Bootstrap
    var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
        .pipe(gulp.dest('./vendor/bootstrap'));
    // Font Awesome
    var fontAwesome = gulp.src('./node_modules/@fortawesome/**/*')
        .pipe(gulp.dest('./vendor'));
    // jQuery Easing
    var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
        .pipe(gulp.dest('./vendor/jquery-easing'));
    // Fonts File
    var fontAwesome = gulp.src('./dev/fonts/**/*')
        .pipe(gulp.dest('./www/assets/fonts'));
    // jQuery
    var jquery = gulp.src([
            './node_modules/jquery/dist/*',
            '!./node_modules/jquery/dist/core.js'
        ])
        .pipe(gulp.dest('./vendor/jquery'));
    // Simple Line Icons
    var simpleLineIconsFonts = gulp.src('./node_modules/simple-line-icons/fonts/**')
        .pipe(gulp.dest('./vendor/simple-line-icons/fonts'));
    var simpleLineIconsCSS = gulp.src('./node_modules/simple-line-icons/css/**')
        .pipe(gulp.dest('./vendor/simple-line-icons/css'));
    return merge(bootstrap, fontAwesome, jquery, jqueryEasing, simpleLineIconsFonts, simpleLineIconsCSS);
}

// CSS task
function css() {
    return gulp.src("./dev/styles/*.scss")
        .pipe(plumber())
        .pipe(sass({
            outputStyle: "expanded",
            includePaths: "./node_modules",
        }))
        .on("error", sass.logError)
        .pipe(autoprefixer('last 4 versions'))
        /* .pipe(autoprefixer({
             browsers: ['last 4 versions'],
             cascade: false
         }))
        */
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest("./www/assets/css/"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./www/assets/css/"))
        .pipe(browsersync.stream());

}
// Images task
function images() {
    return gulp.src('./dev/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('www/assets/images/'));
}

// JS task
function js() {
    return gulp.src('./dev/js/*.js')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(uglify().on('error', console.error))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./www/assets/js/'))
        .pipe(browsersync.stream());
    //.pipe(browserSync.reload({ stream: true }))
}

// nunjucks task
function nunjucks() {
    return gulp.src('dev/views/pages/*.+(nunjucks)')
        .pipe(nunjucksRender({
            path: ['dev/views']
        }))
        .pipe(gulp.dest('www/'))
}

// Watch files
function watchFiles() {
    gulp.watch("./dev/styles/**/*.scss", css);
    gulp.watch("./dev/js/**/*", js);
    gulp.watch("./dev/views/**/*.+(html|nunjucks)", nunjucks);
    gulp.watch("./**/*.html", browserSyncReload);
    return new Promise(function(resolve, reject) {
        console.log("HTTP Server Started");
        resolve();
    });
}
// Load critical css
function criticalCss() {
    return gulp.src('./www/*.html')
        .pipe(critical({
            base: './www/',
            inline: true,
            css: ['./www/assets/css/main.min.css']
        }))
        .on('error', function(err) {
            log.error(err.message);
        })
        .pipe(gulp.dest('./www/'))
        .pipe(browsersync.stream());

}

// Define complex tasks
const vendor = gulp.series(clean, modules, gulp.parallel(images));
const build = gulp.series(vendor, nunjucks, gulp.parallel(js, css, criticalCss));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));
//const critical = gulp.series(gulp, gulp.parallel(critical, ));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;