var gulp = require("gulp"),
    rimraf = require("rimraf"),
    fs = require("fs")
    execSync = require("child_process").execSync;

var info = require("./package.json");
var tsc = (process.platform === "win32") ? 
    "node_modules\\.bin\\tsc.cmd" :
    "node_modules/.bin/tsc";

var typings = (process.platform === "win32") ? 
    "node_modules\\.bin\\typings.cmd" :
    "node_modules/.bin/typings";


gulp.task("setmeup", function() {
    execSync("npm install");
    execSync("typings install"); 
});

gulp.task("typescript", ["cleanup"], function() {
    try {
        fs.statSync(tsc);
    } catch (e) {
        console.log(e);
        gulp.start("setmeup");
    }
    execSync(tsc, {cwd: __dirname});
});

gulp.task("createLink", ["typescript"], function() {
    execSync("npm link", {cwd: __dirname});
});

gulp.task("build", ["createLink"]);

gulp.task("cleanup", function () {
    rimraf.sync("./lib");
    rimraf.sync("./deploy");
});

gulp.task("default", ["build"]);