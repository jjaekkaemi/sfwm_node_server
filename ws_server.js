const {WebSocketServer} = require('ws')
const {getSensorData} = require("./ws_client")
const wss = new WebSocketServer({port: 3001})
let client_ws = null
wss.on("connection", ws => {
    console.log("[WSS] connect!")
    client_ws = ws
    client_ws.on("message", data=> {
        console.log("[WSS] GET DATA:", data.toString('utf-8'))
        switch(data.toString('utf-8')){
            case "get" :
                
                sendData({type:0, data:getSensorData()})
                break;
        }
    })
    client_ws.on("close", ws=>{
        client_ws = null
        console.log("[WSS] close")
    })
})

function sendData(data){
    if(client_ws){
        client_ws.send(JSON.stringify(data))
    }
}
function isConnect(){
    return client_ws
}
module.exports = {wss, sendData, isConnect}