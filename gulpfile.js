const {src, dest, watch, parallel, series} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const webp = require('gulp-webp');

const html = () => {
    return src('src/index.html')
        .pipe(concat('index.min.html'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest('dist'));
};

const scripts = () => {
    return src('src/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('src/js'))
        .pipe(browserSync.stream());
};

const styles = () => {
    return src('src/scss/style.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(dest('src/css'))
        .pipe(browserSync.stream());
};

const img = () => {
    return src('src/img/*.{jpg,jpeg,png}')
        .pipe(webp())
        .pipe(dest('src/img'));
};

const watching = () => {
    watch(['src/scss/styles.scss'], styles).on('change', browserSync.reload);
    watch(['src/js/main.js'], scripts).on('change', browserSync.reload);
    watch(['src/*.html']).on('change', browserSync.reload);
};

const serve = () => {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
};

const cleanDist = () => {
    return src('dist')
        .pipe(clean());
};

const building = () => {
    return src([
        'src/css/style.min.css',
        'src/js/main.min.js',
        'src/font/**',
        'src/img/*.{webp,svg}'
    ], {base: 'src'})
        .pipe(dest('dist'));
}

exports.build = series(cleanDist, html, styles, scripts, img, building);
exports.serve = parallel(img, styles, scripts, serve, watching);