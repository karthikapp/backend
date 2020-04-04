var express = require("express")
var cors = require("cors")
const port = 3000;
const csv=require('csvtojson')
csvfile = "/Users/apple/Desktop/testcodes/test/backedn/data.csv"

var filequerystring = "/Users/apple/Desktop/testcodes/test/backedn/"
var app = express()
app.use(cors());

app.get("/:filename", (req,res,next) => {
    filename = req.params.filename
    filenametoupload = filequerystring + filename
    console.log(filenametoupload)
     csv().fromFile(filenametoupload).then((jsonobject) => {
        console.log(jsonobject)
        res.send(jsonobject)
    })
    
    
})

app.listen(3000, () => {
    console.log("server is running in port 3000")
});
