/**
 * @module hysteresis
 */

const { EventEmitter } = require("events");
const dgram = require("dgram"); // Imported here for eslint

/**
 * Emitted when a socket is closed
 *
 * @event Socket#close
 */

/**
 * Emitted with the socket recieves a packet
 *
 * @event Socket#data
 * @param {Buffer}
 */

/**
 * A UDP Socket wrapper for use by the UDP "Server"
 *
 * @augments EventEmitter
 * @fires Socket#close
 * @fires Socket#data
 */
class Socket extends EventEmitter {
    #serverSocket;
    #address;
    #port;
    #family;
    #state;
    #destroyed;
    #ended;
    #interval;
    #lastMessageAt;

    /**
     * Constructor
     *
     * @param {dgram.Socket} serverSocket - the socket that the Server is using for communication
     * @param {object} config
     * @param {string} config.address - the address of the remote connection
     * @param {number} config.port - the port of the remote connection
     * @param {string} config.family - the family of the remote connection
     * @param {?number} [config.timeout] - a timeout (in ms) for this connection, after which time of inactivity, it closes itself
     */
    constructor(serverSocket, { address, port, family, timeout }) {
        super();

        this.#serverSocket = serverSocket;
        this.#address = address;
        this.#port = port;
        this.#family = family;
        this.#state = "connected";

        this.#destroyed = false;
        this.#ended = false;
        this.#lastMessageAt = Date.now();

        if ( timeout ) {
            this.#interval = setInterval(() => {
                if ( Date.now() - this.#lastMessageAt > timeout ) this.destroy();
            }, 0.5*timeout);
        }
    }

    /**
     * Get the socket the server is using
     *
     * @returns {dgram.Socket}
     */
    get serverSocket() { return this.#serverSocket; }

    /**
     * The address family for the remote (`IPv4` or `IPv6`)
     *
     * @returns {string}
     */
    get remoteFamily() { return this.#family; }

    /**
     * The sender's address
     *
     * @returns {string}
     */
    get remoteAddress() { return this.#address; }

    /**
     * The sender's port
     *
     * @returns {number}
     */
    get remotePort() { return this.#port; }

    /**
     * Send a message to the client
     *
     * @param {string|Buffer} data
     * @returns {Promise} resolves when data is written out
     */
    async write(data) {
        if ( this.#destroyed ) return;
        this.#lastMessageAt = Date.now();
        return new Promise((res) => {
            this.serverSocket.send(data,0,data.length,this.remotePort,this.remoteAddress,res);
        });
    }

    /**
     * Recieve data from the server's socket into this 'socket' to handle
     *
     * @private
     * @param {Buffer} msg
     * @fires Socket#data
     */
    _receive(msg) {
        if ( this.#destroyed || this.#ended ) return;
        this.#lastMessageAt = Date.now();
        this.emit("data", msg);
    }

    /**
     * Destroy this socket
     *
     * This ensure no more I/O active happens on this socket.
     *
     * @fires Socket#close
     */
    destroy() {
        this.#destroyed = true;
        clearInterval(this.#interval);
        this.emit("close");
    }

    /**
     * End this socket
     *
     * This stops the socket from recieving any more data,
     * though more data can be sent.
     *
     * @returns {Promise} resolving when the socket is ended.
     */
    async end() {
        this.#ended = true;
    }
}

module.exports = exports = { Socket };
