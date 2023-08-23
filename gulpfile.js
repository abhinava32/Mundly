
const del = require('del');
const gulp = require('gulp');
// import gulp from 'gulp';
const sass = require('gulp-sass')(require('node-sass'));
// import sass from 'gulp-sass';
const cssnano = require('gulp-cssnano');
// import cssnano from 'gulp-cssnano'
const rev = require('gulp-rev');
// import rev from 'gulp-rev';
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');


gulp.task('css', (done) => {
    console.log('minifying css....... ');
    gulp.src('./Static/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./Static/css'));

    gulp.src('./Static/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images', (done) => {
    console.log("minifying images.... ");
    gulp.src('./Static/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('js', (done) => {
    console.log("minifying js... ");
    gulp.src('./Static/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'js', 'css', 'images'), function(done){
    console.log("Building Assets.... ");
    done();
});
