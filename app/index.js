
var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var path = require('path');
var execSync = require("child_process").execSync;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.tsSrc = "src";
    this.tsDest = "lib";
    this.username    = this.user.git.username; 
    this.email       = this.user.git.email;
    this.projectName = 'local-' + path.basename(this.destinationRoot())
  },
  app: function () { 
     // Folders 
     mkdirp.sync(this.tsSrc); 
     mkdirp.sync(this.tsDest); 
     mkdirp.sync('test');
 
     // Files 
    this.copy('index.ts', path.join(this.tsSrc, 'index.ts')); 
    this.copy('tslint.json', 'tslint.json');
    this.copy('tsconfig.json', 'tsconfig.json');
    this.template('_typings.json', 'typings.json');
    this.template('_package.json', 'package.json');
    this.template('_gulpfile.js', 'gulpfile.js');
  },
  
  install: function () {
     execSync("npm install", {cwd: this.destinationRoot()});
     execSync("typings install", {cwd: this.destinationRoot()})   
  }
  
});
