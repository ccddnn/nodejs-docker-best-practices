// const { createServer } = require("socks-proxy-v5");
import { createServer } from "socks-proxy-v5";

const server = createServer({
  authenticate(login, password) {
    if (login !== "hello" || password !== "thankyou") {
      console.log(["authentication failed", login]);
      return false;
      // authentication failed
    }
    console.log([`user ${login} connect`]);
    // return successful authentication
    return true;
  }
});

server.on('connect', (req, socket, head) => {
  printRequest(req)
})
server.on('request', (req) => {
  printRequest(req)
})
server.on('error', (req) => {
  console.log(['error...'])
  printRequest(req)
})
/* 
server.on('connection', () => console.log(['connection...']))
server.on('close', () => console.log(['close...']))
server.on('listening', () => console.log(['listening...']))
server.on('checkContinue', () => console.log(['checkContinue...']))
server.on('checkExpectation', () => console.log(['checkExpectation...']))
server.on('clientError', () => console.log(['clientError...']))
server.on('dropRequest', () => console.log(['dropRequest...']))
server.on('upgrade', () => console.log(['upgrade...']))
 */

server.listen(18001, () => {
  var port = server.address().port;
  console.log('Socks5 proxy server listening on port %d', port);
});

function printRequest(request) {
  try {
    console.log([(new Date()).toISOString(),'to:', request.url,'from:',request.remoteAddress])
  } catch(e) {
    console.log(['print request error'])
  }
}
