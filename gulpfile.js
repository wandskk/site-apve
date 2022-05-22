const gulp = require("gulp");
const { watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

gulp.task("browserReload", function () {
  browserSync.init({
    proxy: "http://localhost:3000/",
  });

  watch("./dist/**/*.scss", gulp.series("buildsass")).on("change", reload);
  watch("./**/*.html").on("change", reload);
  watch("./js/**/*.js").on("change", reload);
});

gulp.task("sassMain", function () {
  console.log("compile main...");
  return gulp
    .src("./dist/sass/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"));
});

//  coloca as "tasks" em um array chamado "buildsass"
gulp.task("buildsass", gulp.series("sassMain"));

//  cria o comando "gulp watch" que fica observando o array de taks
exports.watch = function () {
  //watch('Styles/*.scss', gulp.series('buildsass'));//Verifica arquivos principais
  watch("./dist/sass/**/*.scss", gulp.series("buildsass")); //Veririca arquivos relativos
};
