const fs = require('fs')
const {sendData} = require("./ws_server")
const dir = "./data"
function fileCheck(){
    setInterval(()=>{
        fs.readdir(dir, function(error, filelist){
            if(filelist.length!=0){
                for(let f of filelist){
                    fs.readFile(`${dir}/${f}`, (err, data)=>{
                        if(!err) {
                            sendData({type:1, data:data.toString("base64")})

                            fs.unlink(`${dir}/${f}`, err=>{
                                if(err) console.log(err)
                                console.log("file deleted")
                            })
                        }
                    })
                    
                }
                
            }
        })
    }, 10000)
}

module.exports = {fileCheck}