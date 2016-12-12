var fs = require('fs');
var html = fs.readFileSync(__dirname + '/test.html', 'utf-8').toString();
var cmsTags = require('..');
var content =  cmsTags.parse(html);


console.log(content);
