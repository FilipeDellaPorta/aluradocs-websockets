import io from "./server.js"

const documentos = [
    {
        nome: 'JavaScript',
        texto: 'texto de javascript...'
    },
    {
        nome: 'Node',
        texto: 'texto de node...'
    },
    {
        nome: 'Socket.io',
        texto: 'texto de socket.io...'
    }
]

io.on('connection', (socket) => {
    console.log('Um cliente se conectou! ID:', socket.id)

    socket.on('selecionar_documento', (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento)

        const documento = encontrarDocumento(nomeDocumento)

        if (documento) {
           devolverTexto(documento.texto)
        }

    })
                                //destruturando o objeto recebido nos dois parametros
    socket.on('texto_editor', ({ texto, nomeDocumento }) => {
        //broadcast envia o texto emitido para todos o cliente, menos para quem emitiu
        //socket.broadcast.emit('texto_duplicado_para_todos', texto) 
        //to faz o mesmo que o broadcast mas filtrando por sala
        const documento = encontrarDocumento(nomeDocumento)

        if (documento) {
            documento.texto = texto
            socket.to(nomeDocumento).emit('texto_duplicado_para_todos', texto)
        }
    })

    //quando sai da pagina que tem o campo de texto aparece no terminal a mensagem de desconexão
    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
    });
    
})

function encontrarDocumento(nome) {
    const documento = documentos.find((documento) => {
        return documento.nome === nome
    })

    return documento
}

