var gulp =          require("gulp");
var less =          require("gulp-less");
var cmq =           require("gulp-combine-mq");
var postcss =       require("gulp-postcss");
var autoprefixer =  require("autoprefixer");
var minify =        require("gulp-minify-css");
var rename =        require("gulp-rename");
var watch =         require("gulp-watch");
var server =        require('gulp-server-livereload');
var imagemin =      require('gulp-imagemin');
var pngquant =      require('imagemin-pngquant');

var src = "./src";
var dest = "./build";

gulp.task("webserver", function() {
  gulp.src("build")
    .pipe(server({
      livereload: true,
      port: 8888,
      directoryListing: false,
      open: false
    }));
});


gulp.task("watch", function() {
  var queue = sequence(300);
  watch(
    {
      name: "css",
      emitOnGlob: false,
      glob: ["less/**/*.less"]
    }, queue.getHandler("build-styles"));
});


gulp.task("build-js", function () {
  return gulp.src(src + "/js/*")
              .pipe(gulp.dest(dest + "/js"));
});


gulp.task("build-styles", function () {
  return gulp.src(src + "/less/style.less")
              .pipe(less())
              .pipe(cmq())
              .pipe(postcss([
                      autoprefixer({browsers: "last 2 versions"})
                    ]))
              .pipe(rename("style.css"))
              .pipe(gulp.dest(dest + "/css"))
              .pipe(minify())
              .pipe(rename("style.min.css"))
              .pipe(gulp.dest(dest + "/css"));
});


gulp.task("build-img", function() {
  return gulp.src(src + "/img/*")
              .pipe(imagemin({
                  progressive: true,
                  svgoPlugins: [{removeViewBox: false}],
                  use: [pngquant()]
              }))
              .pipe(gulp.dest(dest + "/img"));  
});


gulp.task("build-html", function() {
  return gulp.src(src + "/*.html")
              .pipe(gulp.dest(dest + "/"));  
});


gulp.task("build-fonts", function() {
  return gulp.src(src + "/fonts/*")
              .pipe(gulp.dest(dest + "/fonts"));  
});


gulp.task("default", function() {
});

// такая последовательность работает быстрее чем runSequence )
gulp.task("build", function () {
  gulp.src(src + "/less/style.less")
      .pipe(less())
      .pipe(cmq())
      .pipe(postcss([
              autoprefixer({browsers: "last 2 versions"})
            ]))
      .pipe(rename("style.css"))
      .pipe(gulp.dest(dest + "/css"))
      .pipe(minify())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest(dest + "/css"));

  gulp.src(src + "/img/*")
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      }))
      .pipe(gulp.dest(dest + "/img"));  

  gulp.src(src + "/*.html")
      .pipe(gulp.dest(dest + "/"));  
  
  gulp.src(src + "/fonts/*")
      .pipe(gulp.dest(dest + "/fonts"));
  
  gulp.src(src + "/js/*")
      .pipe(gulp.dest(dest + "/js"));
  
})
