var express = require("express")
var cors = require("cors")
const port = 3000;
const csv=require('csvtojson')
csvfile = "./data.csv"
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
var filequerystring = "./"
var app = express()
var moment = require('moment');
moment().format();

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.get("/apicall/:filename", (req,res,next) => {
    filename = req.params.filename
    filenametoupload = filequerystring + filename
    console.log(filenametoupload)
     csv().fromFile(filenametoupload).then((jsonobject) => {
        // console.log(jsonobject)
        res.send(jsonobject)
    });
});

app.get("/newline/:apiname", (req,res,next) => {
    var apiname = req.params.apiname
    res.send({apiname: apiname})
});

app.post('/api/upload/:filterdays', multipartMiddleware, (req, res) => {
    // console.log("called function", req.files.uploads[0].path)
    var filtereddays = req.params.filterdays
    var date = new Date();
    console.log(date)
    // var sevendays = date.addDays(-filtereddays)
    var sevendays = Date.parse(date.addDays(-filtereddays))
    console.log("seven days", sevendays)
    csv().fromFile(req.files.uploads[0].path).then((jsonobject) => {
        // console.log(jsonobject)
        // (jsonobject).forEach(el => {
        //    console.log( el.date,moment(el.date, "DD-MM-YY").toDate())
        // })
        filtered = jsonobject.filter(x => moment(x.date, "DD-MM-YY").toDate() > sevendays)
        // console.log(filtered.length)
        // console.log(jsonobject.length)
        res.send(filtered)
    });
});

app.listen(3000, () => {
    console.log("server is running in port 3000")
});
