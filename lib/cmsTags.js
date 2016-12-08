'use strict';
var yaml= require('js-yaml');

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
    var fields = [];
    for(var i = 0; i<cmsFields.length; i++) {
      snippet = cmsFields[i];
      //Clean cms snippet tags
      snippet = snippet.replace(/\[cms-field\]/, '');
      snippet = snippet.replace(/\[\/cms-field\]/, '');
      snippet =  //parses yaml
      fields.push(yaml.safeLoad(snippet));
    }
    return fields;
  }
}
