'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {

  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    this.appname = 'Cant find name from package.json';
  }

};

util.inherits(ServiceGenerator, yeoman.generators.NamedBase);

ServiceGenerator.prototype.files = function files() {
  this.template('service.js', 'app/services/'+this.name+'/index.js');
  this.template('spec.js', 'app/service/'+this.name+'/index.spec.js');

  this.log.writeln(' creating'.green + ' %s','files');
};
