const express = require('express');
const app = express();
const {connectWS, getConnectStatus, connectWSInterval} = require('./ws_client')
const {wss} = require('./ws_server')
const {serial_port} = require('./serial')
const {fileCheck} = require("./filecheck")
let port = 3000;
let server_address = null
let i = 0 ;
for(i = 2 ; i<process.argv.length ; i+=2){
    switch(process.argv[i]){
        case "-p" :
            port = Number(process.argv[i+1]);
            break;

    }
}

app.get("/", function (req, res){
    res.send("hello world");
});

let server = app.listen(port, function(){
    const host = server.address().address;
    const port = server.address().port;

    console.log("server is working: port - ", port)
    fileCheck()
})