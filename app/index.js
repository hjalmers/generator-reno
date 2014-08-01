'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var CgangularGenerator = module.exports = function CgangularGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });

    this.log.writeln('  yo reno:module'.yellow + ' generates an angular module with a controller and template.');
    this.log.writeln('  yo reno:service'.yellow + ' generates an angular service.');
    this.log.writeln('  yo reno:directive'.yellow + ' generates an angular directive in an existing module.');
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));*/
};

util.inherits(CgangularGenerator, yeoman.generators.Base);


/*CgangularGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'appname',
    message: 'What would you like the angular app/module name to be?',
    default: path.basename(process.cwd())
  }];

  this.prompt(prompts, function (props) {
    this.appname = props.appname;

    cb();
  }.bind(this));
};*/

CgangularGenerator.prototype.app = function app() {
  this.directory('skeleton/','./');
};