const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssnano');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// Essential files/directory for development mode source file
const inputPath = 'src/assets/sass/*.scss';
const outputPath = 'src/assets/css';
const cssUrl = 'style.css';
const watcherResource = 'src/assets/sass/**/*';

//Essential file/directory for production mode
const production_outputPath = 'dist/assets/css';




const sassOptions = {
    outputStyle: 'expanded' //expanded,compressed
};

const prefixerOptions = {
    cascade: false
};




// copy all html file for production
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('styles', function () {
    return gulp.src(inputPath)
        // .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(prefix(prefixerOptions))
        .pipe(rename(cssUrl))
        .pipe(gulp.dest(outputPath))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputPath))
});


gulp.task('production_styles', function () {
    return gulp.src(inputPath)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(prefix(prefixerOptions))
        .pipe(rename(cssUrl))
        .pipe(gulp.dest(production_outputPath))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(production_outputPath))
});


// development mode
gulp.task('build', gulp.series('styles', function (done) {
    gulp.watch(watcherResource, gulp.parallel('styles'));
    done();
}));

//production mode
gulp.task('production', gulp.series(gulp.parallel('html', 'production_styles')));
