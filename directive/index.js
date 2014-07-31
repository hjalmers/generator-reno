'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var fs = require('fs');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {

  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    this.appname = 'Cant find name from package.json';
  }

};

util.inherits(DirectiveGenerator, yeoman.generators.NamedBase);

DirectiveGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    type:'confirm',
    name: 'needpartial',
    message: 'Does this directive need an external html file (i.e. partial)?',
    default: true
  },
  {
    name: 'amdmodule',
    message: 'Enter the path to the module that should hold the directive (i.e. src/app/form/field)?',
    validate: function(moduleName){
      return fs.existsSync(path + '.js') || s.existsSync(path);
    }
  }];

  this.prompt(prompts, function (props) {
    this.needpartial = props.needpartial;
    this.amdmodule = props.andmodule;

    cb();
  }.bind(this));
};

DirectiveGenerator.prototype.files = function files() {

  if (this.needpartial){
    this.template('directive.html', 'src/app/directives/'+this.name+'/'+this.name+'.tpl.html');
    this.template('directive.less', 'src/app/directives/'+this.name+'/'+this.name+'.less');
    this.template('spec.js', 'src/app//directives/'+this.name+'/index.spec.js');

    cgUtils.addToFile('src/less/base.less','@import "../app/directives/'+this.name+'/'+this.name+'";',cgUtils.DIRECTIVE_LESS_MARKER,'');
    this.log.writeln(' updating'.green + ' %s','src/less/base.less'); 
    cgUtils.addToJsFileAsArrayValue('src/app/app.js', '\'module app.directives.' + this.name + ' from "app.directives.'+this.name+'.index";\'', cgUtils.PARTIAL_MODULE_MARKER,'    ');
    this.log.writeln(' updating'.green + ' %s','src/app/app.js');     
    cgUtils.chainTemplate(this.amdmodule, 'directive.js');
    this.log.writeln(' updating'.green + ' %s',this.amdmodule);     

  } else {
    this.template('directive_simple.js', 'src/app/directives/'+this.name+'/index.js');
    this.template('spec_simple.js', 'src/app/directives/'+this.name+'.js'); 

    cgUtils.addToJsFileAsArrayValue('src/app/app.js', '\'module app.directives.' + this.name + ' from "app.directives.'+this.name+'.index";\'', cgUtils.PARTIAL_MODULE_MARKER,'    ');
    this.log.writeln(' updating'.green + ' %s','src/app/app.js');     
  }

};