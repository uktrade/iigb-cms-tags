var fs = require('fs');
var html = fs.readFileSync('test.html', 'utf-8').toString();
var cmsField = require('..');
var content =  cmsField.parse(html);


console.log(content);


