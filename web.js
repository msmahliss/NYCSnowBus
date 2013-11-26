var express = require('express');
var fs = require('fs');
var http    = require('http');
var https   = require('https');
var request =require('request');
var Wufoo  = require('wufoo');
var login = require('./login');

var app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/Public'));
app.get('/', function(request, response) {
var text = fs.readFileSync("index.html","utf-8")
 response.send(text);
});

app.get('/api/wufoo',function(inputs, response) {

var wufoo = new Wufoo(login.DOMAIN,login.API_KEY);
var path = 'https://nycbeachbus.wufoo.com/api/v3/forms/';
var hash = 'q7ffpy71rcw52o';
var filter = inputs.query.filter;

wufoo.get(path+hash+'/entries.json'+'?'+filter,function(err,res){
console.log("# of filtered responses: "+ res.Entries.length);
for (var i=0; i<res.Entries.length; i++){
    console.log(res.Entries[i].Field33 + ' ' + res.Entries[i].Field34);
}

if (err!=undefined){
response.send('Error:' + err);
} else {
response.send(res);
}
});
});

http.createServer(app).listen(app.get('port'),function(){
  console.log("Listening on " + app.get('port'));
});
