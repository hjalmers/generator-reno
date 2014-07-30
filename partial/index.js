'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var PartialGenerator = module.exports = function PartialGenerator(args, options, config) {

  this.log.writeln(args);
  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    this.appname = 'Cant find name from package.json';
  }

};

util.inherits(PartialGenerator, yeoman.generators.NamedBase);

PartialGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [
    {
      name: 'route',
      message: 'Enter your route url (i.e. /mypartial/:id).  If you don\'t want a route added for you, leave this empty.'
    }
  ];

  this.prompt(prompts, function (props) {
    this.routeName = props.routeName;
    this.route = props.route;

    cb();
  }.bind(this));
};

PartialGenerator.prototype.files = function files() {

this.routeData = ''

  var filename = this.name.slice(this.name.lastIndexOf('/') + 1);
  this.ctrlname = _.capitalize(_.camelize(this.name.replace(/\//g,'-'))) + 'Ctrl';

  if (this.route && this.route.length > 0) {
    var js = [
            "$routeProvider",
            "          .when('"+this.route+"', {",
            "              templateUrl: '"+this.name+"/"+this.name+".tpl.html',",
            "              controller: '"+this.ctrlname+"'",            
            "           });"
    ];

    this.routeData = js.join('\r');
  }

  this.template('partial.js',   'src/app/'+this.name+'/index.js');
  this.template('partial.html', 'src/app/'+this.name+'/'+this.name+'.tpl.html');
  this.template('partial.less', 'src/app/'+this.name+'/'+this.name+'.less');
  this.template('spec.js',      'src/app/'+this.name+'/index.spec.js');

  cgUtils.addToJsFileAsArrayValue('src/app/app.js', '\'module app.' + this.name + ' from "app.'+this.name+'.index";\'', cgUtils.PARTIAL_MODULE_MARKER,'    ');

  //cgUtils.addToFile('index.html','<script src="partial/'+this.name+'/'+filename+'.js"></script>',cgUtils.PARTIAL_JS_MARKER,'  ');

  //cgUtils.addToFile('test/unit/index.html','<script src="../../partial/'+this.name+'/'+filename+'.js"></script>',cgUtils.PARTIAL_JS_MARKER,'  ');
  //cgUtils.addToFile('test/unit/index.html','<script src="controller/'+this.name+'.js"></script>',cgUtils.PARTIAL_JS_TEST_MARKER,'  ');
  
  //this.log.writeln(' updating'.green + ' %s','index.html');

  cgUtils.addToFile('src/less/base.less','@import "../app/'+this.name+'/'+this.name+'";',cgUtils.PARTIAL_LESS_MARKER,'');
  this.log.writeln(' updating'.green + ' %s','src/less/base.less');

  
};
