const gulp = require("gulp");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const del = require("del");

gulp.task("clean", function () {
    return del("./dist/react-ms-login.js");
});

gulp.task("clean-example", function () {
    return del("./examples/example.js");
});

gulp.task("build-example", ["clean-example"], function () {
    browserify({
        entries: "./examples/example.jsx",
        debug: true
    }).transform(babelify, { presets: ["react", "es2015"] })
        .bundle()
        .pipe(source("example.js"))
        .pipe(gulp.dest("./examples"));
});

gulp.task("build", ["clean"], function () {
    browserify({
        entries: "./src/index.jsx",
        debug: false
    }).transform(babelify, { presets: ["react", "es2015"] })
        .bundle()
        .pipe(source("react-ms-login.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["build"]);