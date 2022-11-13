const WebSocket = require('ws');
let ws = null
let isConnect= false
let data_interval = null
let sensordata = {
    tmp: 1,
    pres: 2,
    heat: '0'
}
function connectWSInterval(address){
    setInterval(()=>{
        if(!getConnectStatus()) {
            console.log("[WSC] connect try", address)
            connectWS(address)
        }
    }, 100000)
}
function connectWS(address){
    try{
        ws = new WebSocket(`ws://${address}:8080`);
        ws.on('open', function open(){
            console.log("[WSC] open")
            isConnect = true
            data_interval = setInterval(()=>{
                ws.send("get")
            }, 3000)
        })
        ws.on('message', function message(data) {
            sensordata = JSON.parse(data.toString('utf-8'))
            
        })
        ws.on('close', function close(){
            console.log("[WSC] close")
            clearInterval(data_interval);
            data_interval = null;
            isConnect = false
        })
        ws.on('error', function error(){
            console.log("[WSC] error")
        })
    }
    catch(ex){
        console.log(ex)
    }

}

function getSensorData(){
    return sensordata;
}

function getConnectStatus(){
    return isConnect
}
module.exports = {connectWS, getSensorData, connectWSInterval}