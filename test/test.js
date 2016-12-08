var fs = require('fs');
var html = fs.readFileSync(__dirname + '/test.html', 'utf-8').toString();
var cmsField = require('..');
var content =  cmsField.parse(html);



console.log(content);
