
const dgram = require("dgram");
const { createServer, Server, Socket } = require("../index.js");

(async()=>{
    let s = createServer({
        type : "udp4",
        connectionTimeout:100
    });
    
    s.on("connection", (sock) => {
        sock.on("data",async (buf)=>{
            console.log(`${sock.remotePort} : ${buf.toString()} (${await s.getConnections()})`);
        });
        sock.on("close", () => { console.log("closing") });
        // setInterval(() => { sock.write("catch me outside"); }, 100);
    });

    s.on("close",() => { console.log("done") });

    let port = 58453;
    await s.listen(port);
    s.maxConnections = 3;

    let sock = dgram.createSocket("udp4");
    await new Promise(res => sock.bind(45873,"0.0.0.0",res));
    sock.on("message", (msg) => {
        console.log("Return",msg.toString());
    });

    sock.send(Buffer.from("here"),0,4,port,"localhost");

    // setInterval(() => {
    //     let sock2 = dgram.createSocket("udp4");
    //     // await new Promise(res => sock2.bind(45877,"0.0.0.0",res));
    //     sock2.on("message", (msg) => {
    //         console.log("Return2",msg.toString());
    //     });
    //     sock2.send(Buffer.from("here2"),0,5,port,"localhost");
    // }, 100);

    await new Promise(res => setTimeout(res,100));

    await s.close()
    sock.close();

    await new Promise(res => setTimeout(res,100));

})();
