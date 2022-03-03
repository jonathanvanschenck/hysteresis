/**
 * A wrapper for UDP sockets allowing them to function like TCP servers.
 *
 * @module hysteresis
 */
const { Server, createServer } = require("./lib/server.js");
const { Socket } = require("./lib/socket.js");

module.exports = exports = {
    Server,
    Socket,
    createServer
};
