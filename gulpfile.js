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
  },
  styles: {
    all: 'src/styles/*.scss',
    main: 'src/styles/app.scss',
    material: 'node_modules/angular-material/angular-material.css'
  }
};

var build = 'build/';
var out = {
  libs: build + 'libs/',
  scripts: {
    file: 'app.min.js',
    folder: build + 'scripts/'
  },
  styles: build + 'styles/'
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
  })
  .external(dependencies);

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

gulp.task('compileSass', function() {
  return gulp.src(src.styles.main)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(out.styles))
    .pipe(plugins.connect.reload());
});

gulp.task('copyMaterialCSS', function() {
  return gulp.src(src.styles.material)
    .pipe(gulp.dest(out.styles))
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
	gulp.watch('package.json', ['vendors']);
	gulp.watch(src.html, ['html']);
	gulp.watch(src.scripts.all, ['scripts']);
  gulp.watch(src.styles.all, ['compileSass']);
});

gulp.task('build', ['scripts', 'html', 'vendors', 'compileSass', 'copyMaterialCSS']);
gulp.task('default', ['serve']);
