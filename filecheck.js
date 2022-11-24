const fs = require('fs')
const {sendData, isConnect} = require("./ws_server")
const {sendDataFunc} = require("./serial")
const dir = "../sfwm_python_cv/detected.jpg"
let filedata = false
let alertinterval = null
let existCount = 0
let ALERT_TIME = 29500
function fileCheck(){
    setInterval(()=>{
            fs.readFile(dir, (err, data)=> {
                if(!err) {
                    if(alertinterval==null){
                        alertinterval = setTimeout(()=>{
                            sendDataFunc("a_on")
                            sendDataFunc("a_on")
                            
                            sendData({type:1, data:data})
                            console.log("alert on")
                            
                        },ALERT_TIME)
                    }
                    fs.unlink(dir, err=>{
                        if(err) console.log(err)
                    
                        existCount = 2
                    })
                }
                else{
                        if(existCount==0){
                            existCount = 2
                            filedata = false
                            clearTimeout(alertinterval)
                            alertinterval = null
                            
                            sendDataFunc("a_off")
                            sendDataFunc("a_off")
                            sendData({type:1, data:null})
                    }
                    existCount-=1
                    
                }
            })

    }, 1000)
}

module.exports = {fileCheck}