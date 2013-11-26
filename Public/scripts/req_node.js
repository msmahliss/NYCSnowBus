var request =require('request');
var Wufoo  = require('wufoo');
//var Filters = require('./userinfo');

var wufoo = new Wufoo("nycbeachbus","7ZRQ-QX4Y-GS5Y-8PGF");

var path = 'https://nycbeachbus.wufoo.com/api/v3/forms/';
var hash = 'z7x3q1';
var filter = 'Filter1=Field33+Contains+Melissa&pageSize=50'; 
//console.log('User filter = '+Filters.temp1);
wufoo.get(path+hash+'/entries.json'+'?'+filter,function(err,res){
console.log("# of filtered responses: "+ res.Entries.length);
for (var i=0; i<res.Entries.length; i++){
    console.log(res.Entries[i].Field33 + ' ' + res.Entries[i].Field34);
}
});

