'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var fs = require('fs');
var ps = require('process');

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
    message: 'Does this directive need an external html file?',
    default: true
  },
  {
    name: 'amdmodule',
    message: 'Enter the path to the module that should hold the directive (i.e. src/app/form/field)?',
    validate: function(moduleName){
      var fullPath = ps.cwd() + '/' + moduleName + '.js';
      if(fs.existsSync(fullPath))
      {
        return true;
      }
      return 'Can not find the specified module: ' + fullPath;
    }
  }];

  this.prompt(prompts, function (props) {
    this.needpartial = props.needpartial;
    this.amdmodule = props.amdmodule;                         //  src/app/form/field
    this.moduledir = this.amdmodule.substring(0, this.amdmodule.lastIndexOf('/'))         //  src/app/form
    this.modulepath = ps.cwd() + '/' + this.amdmodule + '.js';    //  /..project/src/app/form/field

    this.dottedmoduledir = this.moduledir.replace('src', '..');                               //  ../app/form
    
    this.modulename = this.moduledir.substring(this.moduledir.lastIndexOf('/'), this.moduledir.length); //form
    cb();
  }.bind(this));
};

DirectiveGenerator.prototype.files = function files() {
  var ord = this.name;
  var m = ord.match(/[A-Z]/g);
  for(var i = 0; i < m.length;i++){
    ord = ord.replace(m[i], '-' + m[i].toLowerCase())
  }
  this.markupname = ord

  if (this.needpartial){
    this.template('directive.html', this.moduledir + '/'+this.markupname+'.tpl.html');
    this.template('directive.less', this.moduledir+'/'+this.markupname+'.less');
    this.template('spec.js', this.moduledir+ '/' + this.markupname + '.spec.js');

    cgUtils.addToFile('src/less/base.less','@import "'+ this.dottedmoduledir+'/'+this.markupname+'";',cgUtils.DIRECTIVE_LESS_MARKER,'');
    this.log.writeln(' updating'.green + ' %s','src/less/base.less'); 
    cgUtils.chainTemplate(this.amdmodule,  __dirname + '/templates/directive.js', { name: this.name, modulename: this.modulename, markupname: this.markupname });
    this.log.writeln(' updating'.green + ' %s',this.amdmodule);     

  } else {
    cgUtils.chainTemplate(this.amdmodule,  __dirname + '/templates/directive_simple.js', { name: this.name, modulename: this.modulename, markupname: this.markupname });
    this.log.writeln(' updating'.green + ' %s',this.amdmodule);     
    this.template('spec_simple.js', this.moduledir+ '/' + this.markupname + '.spec.js');
  }

};