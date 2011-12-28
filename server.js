var argv = require('optimist')
	.default({p: 8800})
	.argv
;

var WebSocketServer = require('websocket').server,
		http = require('http'),
		commons = require("./commons.js"),
		methods = ["play", "stop", "prev", "next", "favorite", "voteup", "votedown", "voteclear", "mute", "volup", "voldown"],
		version = "0.1";

var server = http.createServer(function(req, res) {

	console.log((new Date()) + ' request recieved ' + req.method + ' ' + req.url);

	if (req.method == "GET"){
		var toggle = /\/(\w+)/i.exec(req.url);
		
		if (toggle != null && commons.in_array(toggle[1], methods)){

			socket.broadcast(toggle[1]);
			console.log((new Date()) + ' brodcasting ' + toggle[1] + ' to peers');

			res.writeHead(200);
			res.write("TOGGLING (" + toggle[1] + ") OK");

		}else{

			res.writeHead(500);
			res.write("Method doesn't excist!");

		}
		
	}
	
	res.end();
}).listen(argv.p, function() {

		console.log((new Date()) + ' nodeSharky ' + version + ' is listening on port ' + argv.p);

});

var socket = new WebSocketServer({

	httpServer: server,
	autoAcceptConnections: false

}).on('request', function(request) {

		var connection = request.accept(null, request.origin);
		console.log((new Date()) + ' peer ' + connection.remoteAddress + ' connected');

		connection.on('close', function(reasonCode, description) {
				console.log((new Date()) + ' peer ' + connection.remoteAddress + ' disconnected.');
		});

});