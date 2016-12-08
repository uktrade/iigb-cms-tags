'use strict';
var yaml= require('js-yaml');
var logger=require('./helpers/logger')('iigb-cms-tags');
var debug=logger.debug;
var warn = logger.warn;
var error = logger.error;

/* Supported Types */

var SUPPORTED_TYPES = [
      'text',
      'textarea',
      'select',
      'multiselect',
      'hidden',
      'number',
      'checkbox'
    ];

module.exports=new CMSTags();

function CMSTags() {

  return {
    parse: parse
  };


  function parse(input) {
    input = input || '';
    var cmsFields = input.match(/\[cms-field\][\s\S]*?\[\/cms-field\]/i);
    return cmsFields ? parseFields(cmsFields) : [];
  }

  function parseFields(cmsFields) {
    var snippet;
    var field;
    var fields = [];
    for(var i = 0; i<cmsFields.length; i++) {
      snippet = cmsFields[i];
      //Clean cms snippet tags
      snippet = snippet.replace(/\[cms-field\]/, '');
      snippet = snippet.replace(/\[\/cms-field\]/, '');
      fields.push(load(snippet)); //parse yaml
    }
    return fields;
  }

  //Parses and validates yaml
  function load(snippet) {
    debug('Parsing Field: { %s }', snippet);
    var field = yaml.safeLoad(snippet);
    validate(field);
    return field;
  }

  function validate(field) {
    if(field) {
     must('name');
     must('type');
     validateType(field.type);
    }


  function must(key) {
    debug('key:', key);
    if(field[key]) {
      return;
    }
   fatal('"' + key + '" must be defined for the field');
  }

  //Stop for missing key with appropriate error message
  function validateType(type) {
    if(SUPPORTED_TYPES.indexOf(type) <0 ) {
      fatal('Unsupported type: ' + type);
    }
  }

  }

  function fatal(message) {
   error(message);
   throw message;
  }
}
