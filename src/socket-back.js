import io from "./server.js"

io.on('connection', (socket) => {
    console.log('Um cliente se conectou! ID:', socket.id)

    socket.on('texto_editor', (texto) => {
        //console.log(texto)
        socket.broadcast.emit('texto_duplicado_para_todos', texto) //broadcast envia o texto emitido para todos o cliente, menos para quem emitiu
    })

    //quando sai da pagina que tem o campo de texto aparece no terminal a mensagem de desconexão
    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
      });
    
})

