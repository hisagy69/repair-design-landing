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
const replace  =  require ( 'gulp-replace' ) ; 
const rollup = require('@rollup/stream');
const babel = require('@rollup/plugin-babel');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
let cache;

const html = () => {
    return src('src/**.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest('dist'));
};

const scripts = () => {
    return rollup({
        input: './src/js/index.js',
        plugins: [babel(), commonjs(), nodeResolve()],
        cache: cache,
        output: {
            format: 'iife',
            sourcemap: true
        }
    }).on('bundle', (bundle) => {
        cache = bundle;
    })
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(map.init())
    .pipe(uglify())
    .pipe(map.write('../sourcemaps'))
    .pipe(dest('./src/js'))
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
    return src([
      'src/img/*.{jpg,jpeg,png}',
      'src/img/**/*.{jpg,jpeg,png}'
    ])
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
        'src/phpmailer/**/**',
        'src/**.php',
        'src/css/style.min.css',
        'src/js/main.min.js',
        'src/font/**',
        'src/img/*.{webp,svg}',
        'src/img/**/*.{webp,svg}'
    ], {base: 'src'})
        .pipe(dest('dist'));
}

exports.build = series(cleanDist, html, styles, scripts, img, building);
exports.serve = parallel(img, styles, scripts, serve, watching);
