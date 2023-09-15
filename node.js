var http=require('http');

http.createServer(function(req,res){
    res.write("Hello http/core module");
    res.end()
}).listen("8080");