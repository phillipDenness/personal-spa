//Install express server
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const events = require('events');

// Serve only the static files form the dist directory
app.use(express.static('./dist/personal-spa'));
app.use(bodyParser.json())

app.get('/*', function(req, res) {  
  res.sendFile(path.join(__dirname,'/dist/personal-spa/index.html'));
});

app.post('/api/fund-price', function(req, res) {
    serverEmitter.emit('s3Response', req.body.message);
    res.end('');
});

serverEmitter = new events.EventEmitter();

var server = app.listen(process.env.PORT || 8080);
var io = require('socket.io').listen(server);

io.on("connection", socket => {
    let previousId;

    const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId);
      previousId = currentId;
    };
  
    serverEmitter.on('s3Response', function (data) {
      io.emit("s3Response", data);
    });

    socket.on("getDoc", docId => {
      safeJoin(docId);
      socket.emit("document", documents[docId]);
    });
  
    socket.on("addDoc", doc => {
      documents[doc.id] = doc;
      safeJoin(doc.id);
      io.emit("s3Response", Object.keys(documents));
      socket.emit("document", doc);
    });
  
    socket.on("editDoc", doc => {
      documents[doc.id] = doc;
      socket.to(doc.id).emit("document", doc);
    });
  });

  console.log("Server started");