const gulp = require('gulp');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const jshint = require('gulp-jshint');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const order = require("gulp-order");
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');
const cache = require('gulp-cache');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

gulp.task('styles', function () {
  console.log('enter');
  return gulp.src('src/css/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ioa 6', 'android 4'))
    // .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('dist/css'))
    // .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(babel({
      presets: ['es2015'] // es5检查机制
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('dist/js'))
    // .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('html', function () {
  return gulp.src(['src/index-5.3.html', 'src/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basePATH: '@file'
    }))
    .pipe(gulp.dest('dist/'))
    // .pipe(notify({ message: 'html task complete' }));
});

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    // .pipe(notify({ message: 'Image task complete' }));
});

gulp.task('clean', function () {
  return gulp.src(['index.html', 'dist/css', 'dist/js', 'dist/images'], { read: false })
    .pipe(clean());
});

gulp.task('index', ['clean'], function () {
  gulp.start('styles', 'scripts', 'images', 'html');
  browserSync.reload();
});

gulp.task('default', function () {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    notify: false
  });
  gulp.watch('src/**/*.*', ['index']);
});

gulp.task('minify', function () {
  gulp.src(['*/*.js', '!dist/*.js', '*/*.html'])
    .pipe(babel())
    .pipe(uglify())
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('dist/build'));
});