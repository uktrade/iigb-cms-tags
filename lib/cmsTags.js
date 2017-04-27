'use strict';
var yaml= require('js-yaml');
var logger=require('./helpers/logger')('iigb-cms-tags');
var debug=logger.debug;
var warn = logger.warn;
var error = logger.error;

/* Supported Types */

var BASIC_TYPES = [
      'text',
      'textarea',
      'select',
      'multiselect',
      'hidden',
      'number',
      'checkbox'
    ];

var BLOCK_TYPES = [
      'content',
      'fieldset'
    ];

module.exports=new CMSTags();

function CMSTags() {

  return {
    parse: parse
  };


  function parse(input) {
    input = input || '';
    var cmsFields = input.match(/\[cms-fields\][\s\S]*?\[\/cms-fields\]/ig);
    return cmsFields ? parseFields(cmsFields) : [];
  }

  function parseFields(cmsFields) {
    debug('cms fields %j',cmsFields );
    var snippet;
    var field;
    var fields = {};
    for(var i = 0; i<cmsFields.length; i++) {
      snippet = cmsFields[i];
      //Clean cms snippet tags
      snippet = snippet.replace(/\[cms-fields\]/, '');
      snippet = snippet.replace(/\[\/cms-fields\]/, '');
      extend(fields,load(snippet)); //parse yaml
    }
    return fields;
  }

  //Parses and validates yaml
  function load(snippet) {
    debug('Parsing snippet: { %s }', snippet);
    var fields= yaml.safeLoad(snippet);
    validateFields(fields);
    return fields;
  }


  function validateFields(fields) {
    var field;
    var fieldName;
    Object.keys(fields)
    .forEach(function(key){
        field=fields[key];
        fieldName=key;
        if(isBlock(field)){
          if('fieldset' === field.type){
            must('fields');
          }
          if(field.fields){
            validateFields(field.fields);
          }
        } else {
          validate(field);
        }
      });

    function isBlock(field) {
      if(field) {
         return BLOCK_TYPES.indexOf(field.type) >=0;
      } else {
        return false
      }
    }

    function validate(field) {
      if(field) {
       must('type');
       validateType(field.type);
      }
    }

    function must(key) {
      if(field[key]) {
        return;
    }
     fatal('"' + key + '" must be defined for the field ' + fieldName);
    }

    //Stop for missing key with appropriate error message
    function validateType(type) {
      if(BASIC_TYPES.indexOf(type) <0 ) {
        fatal('Unsupported type: ' + type);
      }
    }

  }

    /**
     * Extend object properties with another given object
     * @param  {Object} source      source object
     * @param  {[type]} destination destionation object
     */
    function extend(source, destination) {
      if (!destination) {
        return;
      }
      Object.keys(destination).forEach(function(key) {
        source[key] = destination[key];
      });
    }




  function fatal(message) {
   error(message);
   throw message;
  }
}
