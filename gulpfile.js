const {src, dest, watch, parallel, series} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const webp = require('gulp-webp');
const map = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const  replace  =  require ( 'gulp-replace' ) ; 

const html = () => {
    return src('src/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest('dist'));
};

const scripts = () => {
    return src([
        // './node_modules/wow.js/dist/wow.min.js',
        './node_modules/jquery/dist/jquery.js',
        './node_modules/swiper/swiper-bundle.js',
        './node_modules/jquery-validation/dist/jquery.validate.js',
        './node_modules/jquery-mask-plugin/dist/jquery.mask.js',
        'src/js/*.js',
        '!src/js/*.min.js'
    ])
        .pipe(map.init())
        .pipe(uglify())
        .pipe(babel({
			presets: ['@babel/env']
		}))
        .pipe(concat('main.min.js'))
        .pipe(map.write('../sourcemaps'))
        .pipe(dest('src/js'))
        .pipe(browserSync.stream());
};

const styles = () => {
    return src('src/scss/style.scss')
        .pipe(map.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(replace(/url\(\"\.\.\/\.\.\//g, 'url("../'))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(dest('src/css'))
        .pipe(map.write('../sourcemaps/'))
        .pipe(browserSync.stream());
};

const img = () => {
    return src('src/img/*.{jpg,jpeg,png}')
        .pipe(webp())
        .pipe(dest('src/img'));
};

const watching = () => {
    watch(['src/scss/**/*.scss'], styles).on('change', browserSync.reload);
    watch(['src/js/*.js', '!src/js/*.min.js'], scripts).on('change', browserSync.reload);
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
    return src('?dist')
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