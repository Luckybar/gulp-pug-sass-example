const gulp = require('gulp');
const gulpServer = require('gulp-webserver');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const wrap = require('gulp-wrap');


// pug to html
gulp.task('html', () => {
    return gulp.src('./src/html/**/*.pug')
        .pipe(pug({
            doctype: 'html',
            pretty: true,
            title: 'Pug'
        }))
        .pipe(gulp.dest('./dist'))
})

// sass to css
gulp.task('styles', () => {
    return gulp.src('./src/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('css-to-js', function() {
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass())
        .pipe(concat('styles.js'))
        .pipe(wrap('export default `<%= contents %>`;'))
        .pipe(gulp.dest('dist'));
});

// server
gulp.task('server', () => {
    return gulp.src('./dist/')
        .pipe(gulpServer({
            port: 8080,
            host: "127.0.0.1",
            open: true,
            livereload: true
        }))
});

gulp.task('build', gulp.series('html', 'styles'));

// watch
gulp.task('watch', gulp.series(
    'build',
    gulp.parallel('server', () => {
        gulp.watch('./src/**/*.pug', gulp.series('html'));
        gulp.watch('./src/sass/**/*.sass', gulp.series('styles'));
    })
));
