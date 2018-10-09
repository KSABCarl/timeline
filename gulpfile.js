const gulp        = require('gulp');
const sass        = require('gulp-sass');
const sassLint    = require('gulp-sass-lint');
const cleanCSS    = require('gulp-clean-css');
const rename      = require('gulp-rename');
const minify      = require('gulp-minify');
const eslint      = require('gulp-eslint');

/**
 * Compile files
 */
 
gulp.task('normal', () => {
   gulp.src('timeline.scss')
    .pipe(sass({
      includePaths: ['scss'],
      onError: sass.logError
   }))
   .pipe(sassLint())
   .pipe(sassLint.format())
   .pipe(sassLint.failOnError())
   .pipe(gulp.dest('dist'))
  gulp.src('timeline.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest('dist')); 
});

gulp.task('compress', () => {
  gulp.src('timeline.scss')
    .pipe(rename('timeline-min.scss'))
    .pipe(sass({ 
      outputStyle: 'compressed',
      onError: sass.logError 
   }))
   .pipe(sassLint())
   .pipe(sassLint.format())
   .pipe(sassLint.failOnError())
   .pipe(cleanCSS())
   .pipe(gulp.dest('dist'))
  gulp.src('timeline.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(minify())
    .pipe(gulp.dest('dist'));
});
