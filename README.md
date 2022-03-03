# Hysteresis
A UDP Server roughly approximating a promise-ified version of the core `net` module.

Check it out on [github](https://github.com/jonathanvanschenck/hysteresis)!

This module attempts to normalize the interfaces of the
built-in `dgram.Socket` and `net.Server` objects in the context where
one wishes to use the UDP socket like a server. In particular, this amounts to
creating an object like the `net.Socket` object as emitted by a `net.Server`.

## Installation
```sh
npm install jonathanvanschenck/hysteresis
```

## Basic Usage
```js
// Setup the server
const { createServer } = require('hysteresis');

const server = createServer({
  type : 'udp4',           // must specify a type
  connectionTimeout : 1000 // boot sockets after 1 second of inactivity
});

server.on("connection", (socket) => {
  console.log("Got a new connection, saying hello!");
  socket.write("hello!");
  socket.on("data", (msg) => {
    // Handle data from this client
  });
});

// Start listening on random port
server.listen().then(() => {

  // Setup the vanilla udp socket
  const { createSocket } = require("dgram");

  const socket = createSocket("udp4");
  const greeting = Buffer.from("Hello, server");
  socket.write(greeting, 0, greeting.length, server.address().port);
});
```

See more in the [API](API.md)

## TODO
 - Add more examples
 - Add unit tests


