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


function doExec(cmd) {
    execSync(cmd, {cwd: __dirname, stdio: "inherit" });
}

gulp.task("setmeup", function() {
    doExec("npm install");
    doExec("typings install"); 
});

gulp.task("typescript", ["cleanup"], function() {
    try {
        fs.statSync(tsc);
    } catch (e) {
        console.log(e);
        gulp.start("setmeup");
    }
    doExec(tsc, {cwd: __dirname});
});

gulp.task("createLink", ["typescript"], function() {
    doExec("npm link", {cwd: __dirname});
});

gulp.task("build", ["createLink"]);

gulp.task("cleanup", function () {
    rimraf.sync("./lib");
    rimraf.sync("./deploy");
});

gulp.task("default", ["build"]);