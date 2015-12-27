
var gulp = require("gulp");
var gulpBrowser = require("gulp-browser");

gulp.task('browserify',function() {
    return gulp.src('./frontend/*.js')
        .pipe(gulpBrowser.browserify())
        .pipe(gulp.dest("./public/js/"));
});

gulp.task('watchify', function() {

});


gulp.task('default', ['browserify']);