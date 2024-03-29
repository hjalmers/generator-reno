var path = require('path');
var fs = require('fs');

exports.addToFile = function (filename, lineToAdd, beforeMarker, spacing) {

  try {
    var fullPath = path.join(process.cwd(),filename);
    var fileSrc = fs.readFileSync(fullPath,'utf8');

    var indexOf = fileSrc.indexOf(beforeMarker);
    fileSrc = fileSrc.substring(0,indexOf) + lineToAdd + "\n" + spacing + fileSrc.substring(indexOf);

    fs.writeFileSync(fullPath,fileSrc);

  } catch(e) {
    throw e;
  }
};

exports.chainTemplate = function(filename, template, data){
try {
    var fullPath = path.join(process.cwd(),filename + '.js');
    var fileSrc = fs.readFileSync(fullPath,'utf8');

    var templateSrc = fs.readFileSync(template, 'utf8');

    for(key in data){
      var rx = new RegExp('<%= ' + key + ' %>', 'g');
      templateSrc = templateSrc.replace(rx, data[key]);
    }

    var lastSemicolon = fileSrc.lastIndexOf(";") ;

    fileSrc = fileSrc.substring(0, lastSemicolon) + templateSrc;

    fs.writeFileSync(fullPath,fileSrc);

  } catch(e) {
    throw e;
  }
};

exports.addToJsFileAsArrayValue = function (filename, lineToAdd, beforeMarker, spacing) {

  try {
    var fullPath = path.join(process.cwd(),filename);
    var fileSrc = fs.readFileSync(fullPath,'utf8');

    var indexOf = fileSrc.indexOf(beforeMarker);
    var firstPartOfFile = fileSrc.substring(0,indexOf);
    var tightIndexOf = firstPartOfFile.lastIndexOf("'") + 1;

    fileSrc = fileSrc.substring(0,tightIndexOf) + ',\n' + spacing + lineToAdd + "\n" + fileSrc.substring(indexOf);

    fs.writeFileSync(fullPath,fileSrc);

  } catch(e) {
    throw e;
  }
};

exports.DIRECTIVE_LESS_MARKER = "/* Add Directive LESS Above */"; 
exports.DIRECTIVE_JS_MARKER = "<!-- Add New Directive JS Above -->";
exports.FILTER_JS_MARKER = "<!-- Add New Filter JS Above -->";
exports.SERVICE_JS_MARKER = "<!-- Add New Service JS Above -->";
exports.MODEL_JS_MARKER = "<!-- Add New Model JS Above -->";
exports.PARTIAL_LESS_MARKER = "/* Add Partial LESS Above */"; 
exports.PARTIAL_JS_MARKER = "<!-- Add New Partial JS Above -->";
exports.PARTIAL_MODULE_MARKER = "/* Add New Module Above */";

exports.DIRECTIVE_JS_TEST_MARKER = "<!-- Add New Directive Test JS Above -->";
exports.FILTER_JS_TEST_MARKER = "<!-- Add New Filter Test JS Above -->";
exports.SERVICE_JS_TEST_MARKER = "<!-- Add New Service Test JS Above -->";
exports.MODEL_JS_TEST_MARKER = "<!-- Add New Model Test JS Above -->"; 
exports.PARTIAL_JS_TEST_MARKER = "<!-- Add New Partial Test JS Above -->";

exports.ROUTE_MARKER = "/* Add New Routes Above */";
