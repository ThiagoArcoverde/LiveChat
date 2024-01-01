var express = require("express")
var app = express()
var nativeHttpNodeServer = require("http").createServer(app)
var io = require("socket.io")(nativeHttpNodeServer)

io.on("connection", (socket) => {

    socket.on("disconnect", () => {
        console.log(socket.id + " foi desconectado")
    })

    socket.on("msg", (data) => {
        // socket.broadcast.emit() envia para todos os sockets do servidor com exceção do socket que disparou o evento
        io.emit("msgReceived", data)
    })
})



app.set("view engine", "ejs")

app.get("/", (req,res) => {
    res.render("index")
})

nativeHttpNodeServer.listen(3000, () => {
    console.log("App rodando!")
})