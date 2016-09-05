'use strict';
var gulp            = require('gulp'),
  babelify          = require('babelify'),
  browserify        = require('browserify'),
  vinylSourceStream = require('vinyl-source-stream'),
  vinyBuffer        = require('vinyl-buffer');

var plugins = require('gulp-load-plugins')();

var packageJson    = require('./package.json');
var dependencies   = Object.keys(packageJson && packageJson.dependencies || {});

var src = {
  html: 'src/**/*.html',
  scripts: {
    all: 'src/app/**/*.js',
    app: 'src/app/app.js'
  }
};

var build = 'build/';
var out = {
  libs: build + 'libs/',
  scripts: {
    file: 'app.min.js',
    folder: build + 'scripts/'
  }
};

gulp.task('html', function() {
  return gulp.src(src.html)
    .pipe(gulp.dest(build))
    .pipe(plugins.connect.reload());
});

gulp.task('jshint', function() {
  return gulp.src(src.scripts.all)
    .pipe(plugins.jshint({
      esversion: 6 // Enable ES6 support
    }))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('vendors', function() {
  var vendors = browserify({
    debug: true
  })
  .require(dependencies);

  return vendors.bundle()
    .pipe(vinylSourceStream('vendor.bundle.js'))
    .pipe(vinyBuffer())
    .pipe(gulp.dest(out.libs))
    .pipe(plugins.connect.reload());
});

gulp.task('scripts', ['jshint'], function() {
  var sources = browserify({
    entries: src.scripts.app,
    debug: true
  })
  .transform(babelify, {
    presets: ['es2015']
  });

  return sources.bundle()
    .pipe(vinylSourceStream(out.scripts.file))
    .pipe(vinyBuffer())
    .pipe(plugins.sourcemaps.init({
      loadMaps: true
    }))
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('./', {
      includeContent: true
    }))
    .pipe(gulp.dest(out.scripts.folder))
    .pipe(plugins.connect.reload());
});

gulp.task('serve', ['build', 'watch'], function() {
  plugins.connect.server({
    root: build,
    port: 9090,
    livereload: true,
    fallback: build + 'index.html'
  });
});

gulp.task('watch', function() {
	gulp.watch(src.libs, ['vendors']);
	gulp.watch(src.html, ['html']);
	gulp.watch(src.scripts.all, ['scripts']);
});

gulp.task('build', ['scripts', 'html', 'vendors']);
gulp.task('default', ['serve']);
