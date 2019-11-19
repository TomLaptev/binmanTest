var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  bourbon = require('node-bourbon'),
  ftp = require('vinyl-ftp'),
  notify = require("gulp-notify");

// Скрипты проекта
gulp.task('scripts', function () {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bxslider/dist/jquery.bxslider.js',
      'node_modules/page-scroll-to-id/jquery.malihu.PageScroll2id.js',
      'node_modules/jquery-parallax.js/parallax.min.js',
      'node_modules/slick-carousel/slick/slick.js',
      'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
      'node_modules/overlayscrollbars/js/jquery.overlayScrollbars.min.js',
      'node_modules/sweetalert/dist/sweetalert.min.js',
      'src/js/main.js',
       // Всегда в конце
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({stream: true
    }));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false,
    // tunnel: true,
    // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
  });
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass({
      includePaths: bourbon.includePaths
    }).on("error", notify.onError()))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'scripts', 'browser-sync'], function () {
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch(['src/js/main.js'], ['scripts']);
  gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('imagemin', function () {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'scripts'], function () {

  var buildFiles = gulp.src([
    'src/*.html',
    'src/.htaccess',
  ]).pipe(gulp.dest('dist'));

  var buildCss = gulp.src([
    'src/css/main.min.css',
  ]).pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src([
    'src/js/scripts.min.js',
  ]).pipe(gulp.dest('dist/js'));

  var buildFonts = gulp.src([
    'src/fonts/**/*',
  ]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function () {

  var conn = ftp.create({
    host: 'hostname.com',
    user: 'username',
    password: 'userpassword',
    parallel: 10,
    log: gutil.log
  });

  var globs = [
    'dist/**',
    'dist/.htaccess',
  ];
  return gulp.src(globs, {
      buffer: false
    })
    .pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function () {
  return del.sync('dist');
});
gulp.task('clearcache', function () {
  return cache.clearAll();
});

gulp.task('default', ['watch']);