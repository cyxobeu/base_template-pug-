var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    spritesmith = require('gulp.spritesmith'),
    pug = require('gulp-pug');

var Path = {
  js_path : {
    main_path : "./src/js/main/**/**.js",
    plugins_path : "./src/js/plugins/*.js"
  },
  sass_path : "./src/scss/*.scss",
  sprite_path : "./src/img/*.png",
  pug_path : "./src/pug/layout.pug"
};

gulp.task('pug', function buildHTML() {
  return gulp.src(Path.pug_path)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src(Path.sprite_path)
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    cssFormat: 'css',
    imgPath: './static/img/sprite.png'
  }));
  var imgStream = spriteData.img
  .pipe(gulp.dest('./static/img/'));
  var cssStream = spriteData.css
  .pipe(gulp.dest('./src/scss/'))
});

gulp.task('scss', function() {
  return gulp
  .src('./src/scss/style.scss')
  .pipe(plumber(function (error) {
    this.emit('end');
  }))
  .pipe(sass({
    css: './',
    sass: './src/scss',
    images: './static/img'
  }))
  .pipe(autoprefixer({
    browsers: ['> 1%', 'Firefox > 0'],
    cascade: false
  }))
  .pipe(csso({
      restructure: true,
      sourceMap: true,
      debug: true
  }))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('scripts', function() {
  return gulp
  .src(Path.js_path.main_path)
  .pipe(plumber(function (error) {
    this.emit('end');
  }))
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./static/js'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('plugins_scripts', function() {
  return gulp
    .src(Path.js_path.plugins_path)
    .pipe(plumber(function (error) {
      this.emit('end');
    }))
    .pipe(concat('plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./static/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('default', ['sprite'], function() {
  gulp.start('scss');
  gulp.start('plugin_scripts');
  gulp.start('scripts');
  gulp.start('pug');
});

gulp.task('watch', ['browser-sync'], function() {
  watch(Path.pug_path, function () {
    gulp.start('pug');
  });
  watch(Path.sprite_path, function() {
    gulp.start('sprite');
  });
  watch(Path.sass_path, function() {
    gulp.start('scss');
  });
  watch(Path.js_path.plugins_path, function() {
    gulp.start('plugin_scripts');
  });
  watch(Path.js_path.main_path, function() {
    gulp.start('scripts');
  });
});
