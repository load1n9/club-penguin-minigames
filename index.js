var express = require('express');
var app = express();
 
express.static.mime.types['wasm'] = 'application/wasm';
 
app.use(express.static(__dirname + '/circuitmatch'));
app.listen(8000);