import io from "./server.js"

io.on('connection', (socket) => {
    console.log('Um cliente se conectou! ID:', socket.id)

    socket.on('selecionar_documento', (nomeDocumento) => {
        //console.log(nomeDocumento)
        socket.join(nomeDocumento)
    })
                                //destruturando o objeto recebido nos dois parametros
    socket.on('texto_editor', ({ texto, nomeDocumento }) => {
        //console.log(texto)
        //broadcast envia o texto emitido para todos o cliente, menos para quem emitiu
        //socket.broadcast.emit('texto_duplicado_para_todos', texto) 
        //to faz o mesmo que o broadcast mas filtrando por sala
        socket.to(nomeDocumento).emit('texto_duplicado_para_todos', texto)
    })

    //quando sai da pagina que tem o campo de texto aparece no terminal a mensagem de desconexão
   /* socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
    }); */
    
})

