const fs = require('fs')
const {sendData, isConnect} = require("./ws_server")
const dir = "./data"
let filedata = false
function fileCheck(){
    setInterval(()=>{
        if(isConnect()!=null) {
            fs.readdir(dir, function(error, filelist){
                if(filelist.length!=0){
                    for(let f of filelist){
                        if (!filedata){
                            filedata = true
                            setTimeout(()=>{
                                sendData({type:1, data:true})
                            },30000)
                            
                        }
                    }
                    
                }
                else{
                    filedata = false
                }
            })
        }

    }, 1000)
}

module.exports = {fileCheck}