var sys = require("sys"),
    http = require("http"),
    lib = require("./lib.js"),
    ws = require("./node-websocket-server/lib/ws/server"),
    methods = ["play", "stop", "prev", "next", "favorite", "voteup", "votedown", "voteclear", "mute", "volup", "voldown"],
    version = "0.1";
 
console.log("nodeSharky v." + version);


var httpServer = http.createServer(function(req, res){
  if (req.method == "GET"){
    var toggle = /\/(\w+)/i.exec(req.url);
    
    if (toggle != null && lib.in_array(toggle[1], methods)){
      server.broadcast(toggle[1]);
      res.writeHead(200);
      res.write("TOGGLING (" + toggle[1] + ") OK");
    }else{
      res.writeHead(500);
      res.write("Method doesn't excist!");
    }
    
  }
  
  res.end();
});

var server = ws.createServer({
  server: httpServer
});

server.addListener("listening", function(){
  console.log("Waiting for requests ...");
});

server.addListener("connection", function(conn){
  console.log("Client connected (" + conn.id + ")")
});

server.listen(8181);
