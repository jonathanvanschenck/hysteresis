/**
 * @module hysteresis
 */
const { EventEmitter } = require("events");
const dgram = require("dgram");

const { Socket } = require("./socket.js");

/**
 * Emitted when the server's internal socket has closed
 *
 * @event Server#close
 */

/**
 * Emitted when the server recieves a message from an new
 * remote source. The server creates a Socket object associated
 * with that remote source and then emits that here
 *
 * @event Server#connection
 * @param {Socket}
 */

/**
 * Emitted when the server's socket experiences an error.
 *
 * @event Server#error
 * @param {Error}
 */

/**
 * Emitted when the server's socket has bound the local port
 *
 * @event Server#listening
 */

/**
 * A UDP "Server"
 *
 * @augments EventEmitter
 * @fires Server#close
 * @fires Server#connection
 * @fires Server#error
 * @fires Server#listening
 */
class Server extends EventEmitter {
    #maxConnections;
    #connectionTimeout;
    #listening;
    #socket;
    #sockets;

    /**
     * Constructor
     *
     * @param {object} options
     * @param {!string} options.type - the type of udp conection (`'udp4'` or `'udp6'`)
     * @param {?number} [options.connectionTimeout=null] - An option timeout (in ms) after which inactive Sockets are closed. (This prevents memory leaks)
     * @param {?Function} [connectionListener] - Automatically set as a listener for the ['connection']{@link Server#connection} event
     */
    constructor({ type, connectionTimeout }, connectionListener) {
        super();

        this.#socket = dgram.createSocket(type);
        this.#sockets = new Map();

        this.#connectionTimeout = connectionTimeout || null;

        this.socket.on("error", err => this.emit("error", err));
        this.socket.on("close", () => {
            this.#listening = false;
            this.emit("close");
        });
        this.socket.on("listening", () => {
            this.#listening = true;
            this.emit("listening");
        });
        this.socket.on("message", (msg, rinfo) => this.#handleMessage( msg, rinfo ));

        if ( typeof(connectionListener) === "function" ) {
            this.on("connection", connectionListener);
        }
    }

    /**
     * Check if the server is listening
     *
     * @returns {boolean}
     */
    get listening() { return !!this.#listening; }

    /**
     * The maximum number of allowed active connections.
     *
     * If `undefined` then there is no limit.
     *
     * @returns {number|undefined}
     */
    get maxConnections() { return this.#maxConnections; }
    set maxConnections(max) { this.#maxConnections = max; }

    /**
     * Get the address, port and family of this server
     *
     * @see {@link https://nodejs.org/download/release/latest-v16.x/docs/api/dgram.html#socketaddress}
     * @returns {object}
     */
    address() { return this.socket.address(); }

    /**
     * Return the total number of active connections
     *
     * @returns {number}
     */
    async getConnections() {
        return this.sockets.size;
    }

    /**
     * Start listening for connections
     *
     * @param {?number} [port]
     * @param {?string} [address]
     * @returns {Promise} resolves once the server has bound a local port
     */
    async listen(port, address) {
        return new Promise(res => {
            this.socket.bind(port, address, res);
        });
    }

    /**
     * Close this server and all Sockets.
     *
     * @returns {Promise} resolves on shutdown
     */
    async close() {
        let all = [
            new Promise(res => this.socket.close(res) )
        ];
        for ( const [ _, sock ] of this.sockets ) {    //eslint-disable-line no-unused-vars
            all.push(Promise.resolve(sock.destroy()));
        }
        return Promise.all(all);
    }

    /**
     * Get the underlying UDP socket which this server uses
     *
     * @returns {dgram.Socket}
     */
    get socket() { return this.#socket; }

    /**
     * Get the map of active socket connections
     *
     * @returns {Map<Socket>}
     */
    get sockets() { return this.#sockets; }

    /**
     * Handle messages over the server's socket
     *
     * @private
     * @param {Buffer} msg
     * @param {object} rinfo
     * @param {string} rinfo.address
     * @param {number} rinfo.port
     * @param {string} rinfo.family
     * @returns {Promise} resolves on completing of handling
     */
    async #handleMessage( msg, rinfo ) {
        let key = `${rinfo.address}:${rinfo.port}`;
        let socket = this.sockets.get(key, null);
        if ( !socket ) {
            return this.#handleNewConnection( msg, key, rinfo )
                .then((value) => value ? this.#handleMessage( msg, rinfo ) : null );
        } else {
            return socket._receive(msg);
        }
    }

    /**
     * Handle a new connection
     *
     * @private
     * @param {Buffer} msg
     * @param {string} key
     * @param {object} rinfo
     * @param {string} rinfo.address
     * @param {number} rinfo.port
     * @param {string} rinfo.family
     * @fires Server#connection
     * @returns {Promise<boolean>} resolves with a boolean indictaing if the connection was accepted
     */
    async #handleNewConnection( msg, key, rinfo ) {
        if ( this.maxConnections && (await this.getConnections() + 1 > this.maxConnections) ) return false;

        // Create and cache the socket
        let sock = new Socket( this.socket, {
            address:rinfo.address,
            port:rinfo.port,
            family:rinfo.family,
            timeout:this.#connectionTimeout
        });
        this.sockets.set(key, sock);

        // Drop reference on close
        sock.once("close", () => this.sockets.delete(key));

        this.emit("connection", sock);
        return true;
    }
}

/**
 * Create a new Server
 *
 * @param {object} options
 * @param {!string} options.type - the type of udp conection (udp4 or upd6)
 * @param {?number} [options.connectionTimeout=null] - An option timeout (in ms) after which inactive Sockets are closed. (This prevents memory leaks)
 * @param {?Function} [connectionListener] - Automatically set as a listener for the ['connection']{@link Server#connection} event
 * @returns {Server}
 */
function createServer(options, connectionListener) {
    return new Server(options, connectionListener);
}

module.exports = exports = { Server, createServer };
