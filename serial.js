const SerialPort = require('serialport').SerialPort;
const { InterByteTimeoutParser } = require('@serialport/parser-inter-byte-timeout')
const serial_port = new SerialPort({path:"/dev/ttyACM0",baudRate:9600});
const parser = serial_port.pipe(new InterByteTimeoutParser({ interval: 100 }))
let data_interval = null
let cmd_list = []
let sensordata = {
    tmp: 0,
    pres: 0,
    heat: 0
}
// serial open callback
serial_port.on('open', function() {
        console.log('Serial open..');
        data_interval = setInterval(()=>{
            
            sendDataFunc("s_get")
        }, 2333)
});

// serial open callback
parser.on('data', function(data){
    console.log(data.toString())
    let sensorarray = data.toString().replace("[", "").replace("]", "").replace("\r\n", "").split(",")
    
    sensordata.tmp = Number(sensorarray[0])
    sensordata.pres = Number(sensorarray[1])
    sensordata.heat = Number(sensorarray[2])
    cmd_list.shift()
    if(cmd_list.length!=0){
        sendData()
    }
});
function sendData(){
    serial_port.write(cmd_list[0]);
    console.log('Data Send...', cmd_list[0]);
}
function sendDataFunc(msg){   
    cmd_list.push(msg)
    if(cmd_list.length==1){
        sendData()
    }
};

function getSensorData(){
    return sensordata;
}
module.exports = {serial_port,getSensorData, sendDataFunc}
