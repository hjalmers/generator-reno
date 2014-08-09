'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var fs = require('fs');

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {

  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    this.appname = 'Cant find name from package.json';
  }

};

util.inherits(ServiceGenerator, yeoman.generators.NamedBase);

ServiceGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'amdmodule',
    message: 'Enter a module path or leave blank to create new (i.e. src/app/folder/module)?',
    validate: function(moduleName){
      if(moduleName !== '')
      {
        var fullPath = process.cwd() + '/' + moduleName + '.js';
        if(fs.existsSync(fullPath))
        {
          return true;
        }
        return 'Can not find the specified module: ' + fullPath;
      }
      return true;
    }
  }];

  this.prompt(prompts, function (props) {
    this.needpartial = props.needpartial;
    if(props.amdmodule){
      this.amdmodule = props.amdmodule;                         //  src/app/form/field
    }
    this.moduledir = this.amdmodule.substring(0, this.amdmodule.lastIndexOf('/'))         //  src/app/form
    this.modulepath = process.cwd() + '/' + this.amdmodule + '.js';    //  /..project/src/app/form/field

    this.dottedmoduledir = this.moduledir.replace('src', '..');                               //  ../app/form
    
    this.modulename = this.moduledir.substring(this.moduledir.lastIndexOf('/') + 1, this.moduledir.length); //form
    cb();
  }.bind(this));
};

ServiceGenerator.prototype.files = function files() {
  if(this.amdmodule){
    cgUtils.chainTemplate(this.amdmodule,  __dirname + '/templates/service_chained.js', { name: this.name, modulename: this.modulename, markupname: this.markupname });
    this.log.writeln(' updating'.green + ' %s',this.amdmodule);       
    this.template('spec_chained.js', this.moduledir+ '/' + this.name + '.spec.js');
  }else{
    this.template('service.js', 'src/app/services/'+this.name+'/index.js');
    this.template('spec.js', 'src/app/services/'+this.name+'/index.spec.js');
    cgUtils.addToJsFileAsArrayValue('src/app/app.js', '\'module app.' + this.name + ' from "app.services.'+this.name+'.index";\'', cgUtils.PARTIAL_MODULE_MARKER,'    ');
  }

  this.log.writeln(' creating'.green + ' %s','files');
};
