var http            = require('http')
var HttpDispatcher  = require('httpdispatcher')
var dispatcher      = new HttpDispatcher()

var server = http.createServer(function(req, res) {
    dispatcher.dispatch(req, res)
});


dispatcher.onGet("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
}); 

dispatcher.onGet("/test", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    res.end("Testing");
}); 

server.listen()