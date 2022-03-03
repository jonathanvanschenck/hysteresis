<a name="module_hysteresis"></a>

## hysteresis
A wrapper for UDP sockets allowing them to function like TCP servers.


* [hysteresis](#module_hysteresis)
    * [~Server](#module_hysteresis..Server) ⇐ <code>EventEmitter</code>
        * [new Server(options, [connectionListener])](#new_module_hysteresis..Server_new)
        * [.listening](#module_hysteresis..Server+listening) ⇒ <code>boolean</code>
        * [.maxConnections](#module_hysteresis..Server+maxConnections) ⇒ <code>number</code> \| <code>undefined</code>
        * [.socket](#module_hysteresis..Server+socket) ⇒ <code>dgram.Socket</code>
        * [.sockets](#module_hysteresis..Server+sockets) ⇒ <code>Map.&lt;Socket&gt;</code>
        * [.address()](#module_hysteresis..Server+address) ⇒ <code>object</code>
        * [.getConnections()](#module_hysteresis..Server+getConnections) ⇒ <code>number</code>
        * [.listen([port], [address])](#module_hysteresis..Server+listen) ⇒ <code>Promise</code>
        * [.close()](#module_hysteresis..Server+close) ⇒ <code>Promise</code>
    * [~Socket](#module_hysteresis..Socket) ⇐ <code>EventEmitter</code>
        * [new Socket(serverSocket, config)](#new_module_hysteresis..Socket_new)
        * [.serverSocket](#module_hysteresis..Socket+serverSocket) ⇒ <code>dgram.Socket</code>
        * [.remoteFamily](#module_hysteresis..Socket+remoteFamily) ⇒ <code>string</code>
        * [.remoteAddress](#module_hysteresis..Socket+remoteAddress) ⇒ <code>string</code>
        * [.remotePort](#module_hysteresis..Socket+remotePort) ⇒ <code>number</code>
        * [.write(data)](#module_hysteresis..Socket+write) ⇒ <code>Promise</code>
        * [.destroy()](#module_hysteresis..Socket+destroy)
        * [.end()](#module_hysteresis..Socket+end) ⇒ <code>Promise</code>
    * [~createServer(options, [connectionListener])](#module_hysteresis..createServer) ⇒ <code>Server</code>

<a name="module_hysteresis..Server"></a>

### hysteresis~Server ⇐ <code>EventEmitter</code>
A UDP "Server"

**Kind**: inner class of [<code>hysteresis</code>](#module_hysteresis)  
**Extends**: <code>EventEmitter</code>  
**Emits**: [<code>close</code>](#Server+event_close), [<code>connection</code>](#Server+event_connection), [<code>error</code>](#Server+event_error), [<code>listening</code>](#Server+event_listening)  

* [~Server](#module_hysteresis..Server) ⇐ <code>EventEmitter</code>
    * [new Server(options, [connectionListener])](#new_module_hysteresis..Server_new)
    * [.listening](#module_hysteresis..Server+listening) ⇒ <code>boolean</code>
    * [.maxConnections](#module_hysteresis..Server+maxConnections) ⇒ <code>number</code> \| <code>undefined</code>
    * [.socket](#module_hysteresis..Server+socket) ⇒ <code>dgram.Socket</code>
    * [.sockets](#module_hysteresis..Server+sockets) ⇒ <code>Map.&lt;Socket&gt;</code>
    * [.address()](#module_hysteresis..Server+address) ⇒ <code>object</code>
    * [.getConnections()](#module_hysteresis..Server+getConnections) ⇒ <code>number</code>
    * [.listen([port], [address])](#module_hysteresis..Server+listen) ⇒ <code>Promise</code>
    * [.close()](#module_hysteresis..Server+close) ⇒ <code>Promise</code>

<a name="new_module_hysteresis..Server_new"></a>

#### new Server(options, [connectionListener])
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.type | <code>string</code> |  | the type of udp conection (`'udp4'` or `'udp6'`) |
| [options.connectionTimeout] | <code>number</code> | <code></code> | An option timeout (in ms) after which inactive Sockets are closed. (This prevents memory leaks) |
| [connectionListener] | <code>function</code> |  | Automatically set as a listener for the ['connection'](Server#connection) event |

<a name="module_hysteresis..Server+listening"></a>

#### server.listening ⇒ <code>boolean</code>
Check if the server is listening

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+maxConnections"></a>

#### server.maxConnections ⇒ <code>number</code> \| <code>undefined</code>
The maximum number of allowed active connections.

If `undefined` then there is no limit.

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+socket"></a>

#### server.socket ⇒ <code>dgram.Socket</code>
Get the underlying UDP socket which this server uses

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+sockets"></a>

#### server.sockets ⇒ <code>Map.&lt;Socket&gt;</code>
Get the map of active socket connections

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+address"></a>

#### server.address() ⇒ <code>object</code>
Get the address, port and family of this server

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
**See**: [https://nodejs.org/download/release/latest-v16.x/docs/api/dgram.html#socketaddress](https://nodejs.org/download/release/latest-v16.x/docs/api/dgram.html#socketaddress)  
<a name="module_hysteresis..Server+getConnections"></a>

#### server.getConnections() ⇒ <code>number</code>
Return the total number of active connections

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+listen"></a>

#### server.listen([port], [address]) ⇒ <code>Promise</code>
Start listening for connections

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
**Returns**: <code>Promise</code> - resolves once the server has bound a local port  

| Param | Type |
| --- | --- |
| [port] | <code>number</code> | 
| [address] | <code>string</code> | 

<a name="module_hysteresis..Server+close"></a>

#### server.close() ⇒ <code>Promise</code>
Close this server and all Sockets.

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
**Returns**: <code>Promise</code> - resolves on shutdown  
<a name="module_hysteresis..Socket"></a>

### hysteresis~Socket ⇐ <code>EventEmitter</code>
A UDP Socket wrapper for use by the UDP "Server"

**Kind**: inner class of [<code>hysteresis</code>](#module_hysteresis)  
**Extends**: <code>EventEmitter</code>  
**Emits**: [<code>close</code>](#Socket+event_close), [<code>data</code>](#Socket+event_data)  

* [~Socket](#module_hysteresis..Socket) ⇐ <code>EventEmitter</code>
    * [new Socket(serverSocket, config)](#new_module_hysteresis..Socket_new)
    * [.serverSocket](#module_hysteresis..Socket+serverSocket) ⇒ <code>dgram.Socket</code>
    * [.remoteFamily](#module_hysteresis..Socket+remoteFamily) ⇒ <code>string</code>
    * [.remoteAddress](#module_hysteresis..Socket+remoteAddress) ⇒ <code>string</code>
    * [.remotePort](#module_hysteresis..Socket+remotePort) ⇒ <code>number</code>
    * [.write(data)](#module_hysteresis..Socket+write) ⇒ <code>Promise</code>
    * [.destroy()](#module_hysteresis..Socket+destroy)
    * [.end()](#module_hysteresis..Socket+end) ⇒ <code>Promise</code>

<a name="new_module_hysteresis..Socket_new"></a>

#### new Socket(serverSocket, config)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| serverSocket | <code>dgram.Socket</code> | the socket that the Server is using for communication |
| config | <code>object</code> |  |
| config.address | <code>string</code> | the address of the remote connection |
| config.port | <code>number</code> | the port of the remote connection |
| config.family | <code>string</code> | the family of the remote connection |
| [config.timeout] | <code>number</code> | a timeout (in ms) for this connection, after which time of inactivity, it closes itself |

<a name="module_hysteresis..Socket+serverSocket"></a>

#### socket.serverSocket ⇒ <code>dgram.Socket</code>
Get the socket the server is using

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+remoteFamily"></a>

#### socket.remoteFamily ⇒ <code>string</code>
The address family for the remote (`IPv4` or `IPv6`)

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+remoteAddress"></a>

#### socket.remoteAddress ⇒ <code>string</code>
The sender's address

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+remotePort"></a>

#### socket.remotePort ⇒ <code>number</code>
The sender's port

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+write"></a>

#### socket.write(data) ⇒ <code>Promise</code>
Send a message to the client

**Kind**: instance method of [<code>Socket</code>](#module_hysteresis..Socket)  
**Returns**: <code>Promise</code> - resolves when data is written out  

| Param | Type |
| --- | --- |
| data | <code>string</code> \| <code>Buffer</code> | 

<a name="module_hysteresis..Socket+destroy"></a>

#### socket.destroy()
Destroy this socket

This ensure no more I/O active happens on this socket.

**Kind**: instance method of [<code>Socket</code>](#module_hysteresis..Socket)  
**Emits**: [<code>close</code>](#Socket+event_close)  
<a name="module_hysteresis..Socket+end"></a>

#### socket.end() ⇒ <code>Promise</code>
End this socket

This stops the socket from recieving any more data,
though more data can be sent.

**Kind**: instance method of [<code>Socket</code>](#module_hysteresis..Socket)  
**Returns**: <code>Promise</code> - resolving when the socket is ended.  
<a name="module_hysteresis..createServer"></a>

### hysteresis~createServer(options, [connectionListener]) ⇒ <code>Server</code>
Create a new Server

**Kind**: inner method of [<code>hysteresis</code>](#module_hysteresis)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.type | <code>string</code> |  | the type of udp conection (udp4 or upd6) |
| [options.connectionTimeout] | <code>number</code> | <code></code> | An option timeout (in ms) after which inactive Sockets are closed. (This prevents memory leaks) |
| [connectionListener] | <code>function</code> |  | Automatically set as a listener for the ['connection'](Server#connection) event |

<a name="module_hysteresis"></a>

## hysteresis

* [hysteresis](#module_hysteresis)
    * [~Server](#module_hysteresis..Server) ⇐ <code>EventEmitter</code>
        * [new Server(options, [connectionListener])](#new_module_hysteresis..Server_new)
        * [.listening](#module_hysteresis..Server+listening) ⇒ <code>boolean</code>
        * [.maxConnections](#module_hysteresis..Server+maxConnections) ⇒ <code>number</code> \| <code>undefined</code>
        * [.socket](#module_hysteresis..Server+socket) ⇒ <code>dgram.Socket</code>
        * [.sockets](#module_hysteresis..Server+sockets) ⇒ <code>Map.&lt;Socket&gt;</code>
        * [.address()](#module_hysteresis..Server+address) ⇒ <code>object</code>
        * [.getConnections()](#module_hysteresis..Server+getConnections) ⇒ <code>number</code>
        * [.listen([port], [address])](#module_hysteresis..Server+listen) ⇒ <code>Promise</code>
        * [.close()](#module_hysteresis..Server+close) ⇒ <code>Promise</code>
    * [~Socket](#module_hysteresis..Socket) ⇐ <code>EventEmitter</code>
        * [new Socket(serverSocket, config)](#new_module_hysteresis..Socket_new)
        * [.serverSocket](#module_hysteresis..Socket+serverSocket) ⇒ <code>dgram.Socket</code>
        * [.remoteFamily](#module_hysteresis..Socket+remoteFamily) ⇒ <code>string</code>
        * [.remoteAddress](#module_hysteresis..Socket+remoteAddress) ⇒ <code>string</code>
        * [.remotePort](#module_hysteresis..Socket+remotePort) ⇒ <code>number</code>
        * [.write(data)](#module_hysteresis..Socket+write) ⇒ <code>Promise</code>
        * [.destroy()](#module_hysteresis..Socket+destroy)
        * [.end()](#module_hysteresis..Socket+end) ⇒ <code>Promise</code>
    * [~createServer(options, [connectionListener])](#module_hysteresis..createServer) ⇒ <code>Server</code>

<a name="module_hysteresis..Server"></a>

### hysteresis~Server ⇐ <code>EventEmitter</code>
A UDP "Server"

**Kind**: inner class of [<code>hysteresis</code>](#module_hysteresis)  
**Extends**: <code>EventEmitter</code>  
**Emits**: [<code>close</code>](#Server+event_close), [<code>connection</code>](#Server+event_connection), [<code>error</code>](#Server+event_error), [<code>listening</code>](#Server+event_listening)  

* [~Server](#module_hysteresis..Server) ⇐ <code>EventEmitter</code>
    * [new Server(options, [connectionListener])](#new_module_hysteresis..Server_new)
    * [.listening](#module_hysteresis..Server+listening) ⇒ <code>boolean</code>
    * [.maxConnections](#module_hysteresis..Server+maxConnections) ⇒ <code>number</code> \| <code>undefined</code>
    * [.socket](#module_hysteresis..Server+socket) ⇒ <code>dgram.Socket</code>
    * [.sockets](#module_hysteresis..Server+sockets) ⇒ <code>Map.&lt;Socket&gt;</code>
    * [.address()](#module_hysteresis..Server+address) ⇒ <code>object</code>
    * [.getConnections()](#module_hysteresis..Server+getConnections) ⇒ <code>number</code>
    * [.listen([port], [address])](#module_hysteresis..Server+listen) ⇒ <code>Promise</code>
    * [.close()](#module_hysteresis..Server+close) ⇒ <code>Promise</code>

<a name="new_module_hysteresis..Server_new"></a>

#### new Server(options, [connectionListener])
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.type | <code>string</code> |  | the type of udp conection (`'udp4'` or `'udp6'`) |
| [options.connectionTimeout] | <code>number</code> | <code></code> | An option timeout (in ms) after which inactive Sockets are closed. (This prevents memory leaks) |
| [connectionListener] | <code>function</code> |  | Automatically set as a listener for the ['connection'](Server#connection) event |

<a name="module_hysteresis..Server+listening"></a>

#### server.listening ⇒ <code>boolean</code>
Check if the server is listening

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+maxConnections"></a>

#### server.maxConnections ⇒ <code>number</code> \| <code>undefined</code>
The maximum number of allowed active connections.

If `undefined` then there is no limit.

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+socket"></a>

#### server.socket ⇒ <code>dgram.Socket</code>
Get the underlying UDP socket which this server uses

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+sockets"></a>

#### server.sockets ⇒ <code>Map.&lt;Socket&gt;</code>
Get the map of active socket connections

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+address"></a>

#### server.address() ⇒ <code>object</code>
Get the address, port and family of this server

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
**See**: [https://nodejs.org/download/release/latest-v16.x/docs/api/dgram.html#socketaddress](https://nodejs.org/download/release/latest-v16.x/docs/api/dgram.html#socketaddress)  
<a name="module_hysteresis..Server+getConnections"></a>

#### server.getConnections() ⇒ <code>number</code>
Return the total number of active connections

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+listen"></a>

#### server.listen([port], [address]) ⇒ <code>Promise</code>
Start listening for connections

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
**Returns**: <code>Promise</code> - resolves once the server has bound a local port  

| Param | Type |
| --- | --- |
| [port] | <code>number</code> | 
| [address] | <code>string</code> | 

<a name="module_hysteresis..Server+close"></a>

#### server.close() ⇒ <code>Promise</code>
Close this server and all Sockets.

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
**Returns**: <code>Promise</code> - resolves on shutdown  
<a name="module_hysteresis..Socket"></a>

### hysteresis~Socket ⇐ <code>EventEmitter</code>
A UDP Socket wrapper for use by the UDP "Server"

**Kind**: inner class of [<code>hysteresis</code>](#module_hysteresis)  
**Extends**: <code>EventEmitter</code>  
**Emits**: [<code>close</code>](#Socket+event_close), [<code>data</code>](#Socket+event_data)  

* [~Socket](#module_hysteresis..Socket) ⇐ <code>EventEmitter</code>
    * [new Socket(serverSocket, config)](#new_module_hysteresis..Socket_new)
    * [.serverSocket](#module_hysteresis..Socket+serverSocket) ⇒ <code>dgram.Socket</code>
    * [.remoteFamily](#module_hysteresis..Socket+remoteFamily) ⇒ <code>string</code>
    * [.remoteAddress](#module_hysteresis..Socket+remoteAddress) ⇒ <code>string</code>
    * [.remotePort](#module_hysteresis..Socket+remotePort) ⇒ <code>number</code>
    * [.write(data)](#module_hysteresis..Socket+write) ⇒ <code>Promise</code>
    * [.destroy()](#module_hysteresis..Socket+destroy)
    * [.end()](#module_hysteresis..Socket+end) ⇒ <code>Promise</code>

<a name="new_module_hysteresis..Socket_new"></a>

#### new Socket(serverSocket, config)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| serverSocket | <code>dgram.Socket</code> | the socket that the Server is using for communication |
| config | <code>object</code> |  |
| config.address | <code>string</code> | the address of the remote connection |
| config.port | <code>number</code> | the port of the remote connection |
| config.family | <code>string</code> | the family of the remote connection |
| [config.timeout] | <code>number</code> | a timeout (in ms) for this connection, after which time of inactivity, it closes itself |

<a name="module_hysteresis..Socket+serverSocket"></a>

#### socket.serverSocket ⇒ <code>dgram.Socket</code>
Get the socket the server is using

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+remoteFamily"></a>

#### socket.remoteFamily ⇒ <code>string</code>
The address family for the remote (`IPv4` or `IPv6`)

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+remoteAddress"></a>

#### socket.remoteAddress ⇒ <code>string</code>
The sender's address

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+remotePort"></a>

#### socket.remotePort ⇒ <code>number</code>
The sender's port

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+write"></a>

#### socket.write(data) ⇒ <code>Promise</code>
Send a message to the client

**Kind**: instance method of [<code>Socket</code>](#module_hysteresis..Socket)  
**Returns**: <code>Promise</code> - resolves when data is written out  

| Param | Type |
| --- | --- |
| data | <code>string</code> \| <code>Buffer</code> | 

<a name="module_hysteresis..Socket+destroy"></a>

#### socket.destroy()
Destroy this socket

This ensure no more I/O active happens on this socket.

**Kind**: instance method of [<code>Socket</code>](#module_hysteresis..Socket)  
**Emits**: [<code>close</code>](#Socket+event_close)  
<a name="module_hysteresis..Socket+end"></a>

#### socket.end() ⇒ <code>Promise</code>
End this socket

This stops the socket from recieving any more data,
though more data can be sent.

**Kind**: instance method of [<code>Socket</code>](#module_hysteresis..Socket)  
**Returns**: <code>Promise</code> - resolving when the socket is ended.  
<a name="module_hysteresis..createServer"></a>

### hysteresis~createServer(options, [connectionListener]) ⇒ <code>Server</code>
Create a new Server

**Kind**: inner method of [<code>hysteresis</code>](#module_hysteresis)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.type | <code>string</code> |  | the type of udp conection (udp4 or upd6) |
| [options.connectionTimeout] | <code>number</code> | <code></code> | An option timeout (in ms) after which inactive Sockets are closed. (This prevents memory leaks) |
| [connectionListener] | <code>function</code> |  | Automatically set as a listener for the ['connection'](Server#connection) event |

<a name="module_hysteresis"></a>

## hysteresis

* [hysteresis](#module_hysteresis)
    * [~Server](#module_hysteresis..Server) ⇐ <code>EventEmitter</code>
        * [new Server(options, [connectionListener])](#new_module_hysteresis..Server_new)
        * [.listening](#module_hysteresis..Server+listening) ⇒ <code>boolean</code>
        * [.maxConnections](#module_hysteresis..Server+maxConnections) ⇒ <code>number</code> \| <code>undefined</code>
        * [.socket](#module_hysteresis..Server+socket) ⇒ <code>dgram.Socket</code>
        * [.sockets](#module_hysteresis..Server+sockets) ⇒ <code>Map.&lt;Socket&gt;</code>
        * [.address()](#module_hysteresis..Server+address) ⇒ <code>object</code>
        * [.getConnections()](#module_hysteresis..Server+getConnections) ⇒ <code>number</code>
        * [.listen([port], [address])](#module_hysteresis..Server+listen) ⇒ <code>Promise</code>
        * [.close()](#module_hysteresis..Server+close) ⇒ <code>Promise</code>
    * [~Socket](#module_hysteresis..Socket) ⇐ <code>EventEmitter</code>
        * [new Socket(serverSocket, config)](#new_module_hysteresis..Socket_new)
        * [.serverSocket](#module_hysteresis..Socket+serverSocket) ⇒ <code>dgram.Socket</code>
        * [.remoteFamily](#module_hysteresis..Socket+remoteFamily) ⇒ <code>string</code>
        * [.remoteAddress](#module_hysteresis..Socket+remoteAddress) ⇒ <code>string</code>
        * [.remotePort](#module_hysteresis..Socket+remotePort) ⇒ <code>number</code>
        * [.write(data)](#module_hysteresis..Socket+write) ⇒ <code>Promise</code>
        * [.destroy()](#module_hysteresis..Socket+destroy)
        * [.end()](#module_hysteresis..Socket+end) ⇒ <code>Promise</code>
    * [~createServer(options, [connectionListener])](#module_hysteresis..createServer) ⇒ <code>Server</code>

<a name="module_hysteresis..Server"></a>

### hysteresis~Server ⇐ <code>EventEmitter</code>
A UDP "Server"

**Kind**: inner class of [<code>hysteresis</code>](#module_hysteresis)  
**Extends**: <code>EventEmitter</code>  
**Emits**: [<code>close</code>](#Server+event_close), [<code>connection</code>](#Server+event_connection), [<code>error</code>](#Server+event_error), [<code>listening</code>](#Server+event_listening)  

* [~Server](#module_hysteresis..Server) ⇐ <code>EventEmitter</code>
    * [new Server(options, [connectionListener])](#new_module_hysteresis..Server_new)
    * [.listening](#module_hysteresis..Server+listening) ⇒ <code>boolean</code>
    * [.maxConnections](#module_hysteresis..Server+maxConnections) ⇒ <code>number</code> \| <code>undefined</code>
    * [.socket](#module_hysteresis..Server+socket) ⇒ <code>dgram.Socket</code>
    * [.sockets](#module_hysteresis..Server+sockets) ⇒ <code>Map.&lt;Socket&gt;</code>
    * [.address()](#module_hysteresis..Server+address) ⇒ <code>object</code>
    * [.getConnections()](#module_hysteresis..Server+getConnections) ⇒ <code>number</code>
    * [.listen([port], [address])](#module_hysteresis..Server+listen) ⇒ <code>Promise</code>
    * [.close()](#module_hysteresis..Server+close) ⇒ <code>Promise</code>

<a name="new_module_hysteresis..Server_new"></a>

#### new Server(options, [connectionListener])
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.type | <code>string</code> |  | the type of udp conection (`'udp4'` or `'udp6'`) |
| [options.connectionTimeout] | <code>number</code> | <code></code> | An option timeout (in ms) after which inactive Sockets are closed. (This prevents memory leaks) |
| [connectionListener] | <code>function</code> |  | Automatically set as a listener for the ['connection'](Server#connection) event |

<a name="module_hysteresis..Server+listening"></a>

#### server.listening ⇒ <code>boolean</code>
Check if the server is listening

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+maxConnections"></a>

#### server.maxConnections ⇒ <code>number</code> \| <code>undefined</code>
The maximum number of allowed active connections.

If `undefined` then there is no limit.

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+socket"></a>

#### server.socket ⇒ <code>dgram.Socket</code>
Get the underlying UDP socket which this server uses

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+sockets"></a>

#### server.sockets ⇒ <code>Map.&lt;Socket&gt;</code>
Get the map of active socket connections

**Kind**: instance property of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+address"></a>

#### server.address() ⇒ <code>object</code>
Get the address, port and family of this server

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
**See**: [https://nodejs.org/download/release/latest-v16.x/docs/api/dgram.html#socketaddress](https://nodejs.org/download/release/latest-v16.x/docs/api/dgram.html#socketaddress)  
<a name="module_hysteresis..Server+getConnections"></a>

#### server.getConnections() ⇒ <code>number</code>
Return the total number of active connections

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
<a name="module_hysteresis..Server+listen"></a>

#### server.listen([port], [address]) ⇒ <code>Promise</code>
Start listening for connections

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
**Returns**: <code>Promise</code> - resolves once the server has bound a local port  

| Param | Type |
| --- | --- |
| [port] | <code>number</code> | 
| [address] | <code>string</code> | 

<a name="module_hysteresis..Server+close"></a>

#### server.close() ⇒ <code>Promise</code>
Close this server and all Sockets.

**Kind**: instance method of [<code>Server</code>](#module_hysteresis..Server)  
**Returns**: <code>Promise</code> - resolves on shutdown  
<a name="module_hysteresis..Socket"></a>

### hysteresis~Socket ⇐ <code>EventEmitter</code>
A UDP Socket wrapper for use by the UDP "Server"

**Kind**: inner class of [<code>hysteresis</code>](#module_hysteresis)  
**Extends**: <code>EventEmitter</code>  
**Emits**: [<code>close</code>](#Socket+event_close), [<code>data</code>](#Socket+event_data)  

* [~Socket](#module_hysteresis..Socket) ⇐ <code>EventEmitter</code>
    * [new Socket(serverSocket, config)](#new_module_hysteresis..Socket_new)
    * [.serverSocket](#module_hysteresis..Socket+serverSocket) ⇒ <code>dgram.Socket</code>
    * [.remoteFamily](#module_hysteresis..Socket+remoteFamily) ⇒ <code>string</code>
    * [.remoteAddress](#module_hysteresis..Socket+remoteAddress) ⇒ <code>string</code>
    * [.remotePort](#module_hysteresis..Socket+remotePort) ⇒ <code>number</code>
    * [.write(data)](#module_hysteresis..Socket+write) ⇒ <code>Promise</code>
    * [.destroy()](#module_hysteresis..Socket+destroy)
    * [.end()](#module_hysteresis..Socket+end) ⇒ <code>Promise</code>

<a name="new_module_hysteresis..Socket_new"></a>

#### new Socket(serverSocket, config)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| serverSocket | <code>dgram.Socket</code> | the socket that the Server is using for communication |
| config | <code>object</code> |  |
| config.address | <code>string</code> | the address of the remote connection |
| config.port | <code>number</code> | the port of the remote connection |
| config.family | <code>string</code> | the family of the remote connection |
| [config.timeout] | <code>number</code> | a timeout (in ms) for this connection, after which time of inactivity, it closes itself |

<a name="module_hysteresis..Socket+serverSocket"></a>

#### socket.serverSocket ⇒ <code>dgram.Socket</code>
Get the socket the server is using

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+remoteFamily"></a>

#### socket.remoteFamily ⇒ <code>string</code>
The address family for the remote (`IPv4` or `IPv6`)

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+remoteAddress"></a>

#### socket.remoteAddress ⇒ <code>string</code>
The sender's address

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+remotePort"></a>

#### socket.remotePort ⇒ <code>number</code>
The sender's port

**Kind**: instance property of [<code>Socket</code>](#module_hysteresis..Socket)  
<a name="module_hysteresis..Socket+write"></a>

#### socket.write(data) ⇒ <code>Promise</code>
Send a message to the client

**Kind**: instance method of [<code>Socket</code>](#module_hysteresis..Socket)  
**Returns**: <code>Promise</code> - resolves when data is written out  

| Param | Type |
| --- | --- |
| data | <code>string</code> \| <code>Buffer</code> | 

<a name="module_hysteresis..Socket+destroy"></a>

#### socket.destroy()
Destroy this socket

This ensure no more I/O active happens on this socket.

**Kind**: instance method of [<code>Socket</code>](#module_hysteresis..Socket)  
**Emits**: [<code>close</code>](#Socket+event_close)  
<a name="module_hysteresis..Socket+end"></a>

#### socket.end() ⇒ <code>Promise</code>
End this socket

This stops the socket from recieving any more data,
though more data can be sent.

**Kind**: instance method of [<code>Socket</code>](#module_hysteresis..Socket)  
**Returns**: <code>Promise</code> - resolving when the socket is ended.  
<a name="module_hysteresis..createServer"></a>

### hysteresis~createServer(options, [connectionListener]) ⇒ <code>Server</code>
Create a new Server

**Kind**: inner method of [<code>hysteresis</code>](#module_hysteresis)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.type | <code>string</code> |  | the type of udp conection (udp4 or upd6) |
| [options.connectionTimeout] | <code>number</code> | <code></code> | An option timeout (in ms) after which inactive Sockets are closed. (This prevents memory leaks) |
| [connectionListener] | <code>function</code> |  | Automatically set as a listener for the ['connection'](Server#connection) event |

&copy; 2022 Jonathan D. B. Van Schenck
