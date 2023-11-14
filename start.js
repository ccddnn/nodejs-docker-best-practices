var http = require('http');
var proxy = require('proxy');

const server = proxy.createProxy(http.createServer());

server.on('connect', (req, socket, head) => {
  printRequest(req)
})
server.on('request', (req) => {
  printRequest(req)
})
/* 
server.on('connection', () => console.log(['connection...']))
server.on('close', () => console.log(['close...']))
server.on('error', () => console.log(['error...']))
server.on('listening', () => console.log(['listening...']))
server.on('checkContinue', () => console.log(['checkContinue...']))
server.on('checkExpectation', () => console.log(['checkExpectation...']))
server.on('clientError', () => console.log(['clientError...']))
server.on('dropRequest', () => console.log(['dropRequest...']))
server.on('upgrade', () => console.log(['upgrade...']))
 */

server.listen(18000, () => {
  var port = server.address().port;
  console.log('HTTP(s) proxy server listening on port %d', port);
});

function printRequest(request) {
  try {
    console.log([(new Date()).toISOString(), request.url])
  } catch(e) {
    console.log(['print request error'])
  }
}
