var express = require('express');
var fs = require('fs');
var http    = require('http');
var https   = require('https');
var request = require('request');
var Wufoo  = require('wufoo');

var app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/Public'));
app.get('/', function(request, response) {
var text = fs.readFileSync("index.html","utf-8")
 response.send(text);
});

app.get('/api/wufoo',function(inputs, response) {
// var wufoo = new Wufoo(process.env.WUFOO_DOMAIN,process.env.WUFOO_API_KEY);
var wufoo = new Wufoo('nycbeachbus','7ZRQ-QX4Y-GS5Y-8PGF');
var path = 'https://nycbeachbus.wufoo.com/api/v3/reports/';

//var hash = 'zsaxuro12v2avd'; //MSH report
//var hash = 'qnckor21ndrj80'; //real form 
var hash = 'zx97tfo15k868p'; //real report

var date = inputs.query.filter;
console.log(date);
wufoo.get(path+hash+'/entries.json',function(err,res){
var Entries = [];
for (var i=0; i<res.Entries.length; i++) {
    if (res.Entries[i].Field1==date)  {
//	console.log('Date: '+res.Entries[i].Field1 + ' / Dep: '+res.Entries[i].Field8 +' / # Seats:'+ res.Entries[i].Field10);
	Entries.push(res.Entries[i]);
    }
}
    
if (err!=undefined){
response.send('Error:' + err);
} else {
response.send(Entries);
}
});
});

http.createServer(app).listen(app.get('port'),function(){
  console.log("Listening on " + app.get('port'));
});
