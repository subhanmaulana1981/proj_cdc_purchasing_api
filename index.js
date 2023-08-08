/* module(s) */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

/* application */
const app = express();
const port = 5135;
const server = app.listen(5135, function () {
    console.log(`server siap melayani klien di port ${port}`);
});

/* socket dot io ninja */
var socket = require("socket.io");
var ioServer = socket(server);

// ketika terjadi koneksi
ioServer.on("connection", function (klien) {
    console.log(`${klien.id} connected`);
    // ioServer.send();

    // feedBack broadCast
    ioServer.emit("pesan", "hi");

    // listener pesan
    klien.on("pesan", function (data) {
        console.log(`pesan dari klien ${klien.id}: ${data}`);

        // broadCast response to all klien(s)
        ioServer.emit("pesan", "1");
    });
});

/* middleware (s) */

// cross-origin
/* const corsOptions = {            
    origin: "http://207.148.122.70:5135"
} */

const corsOptions = {
    origin: "http://127.0.0.1:5135",
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
// app.use(cors());

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true 
}));

// my error handling
/* app.use(function (err, req, res) {
    console.log(err);
}); */

/* http method */
app.get("/api", function (req, res) {
    // console.log("cdc global informatika | api service");
    res.send("cdc global informatika | api service");
})