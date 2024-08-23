import {
  atualizaDocumento,
  encontrarDocumento,
  obterDocumentos,
} from "./documentosDB.js";
import io from "./server.js";

io.on("connection", (socket) => {
  socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await obterDocumentos();

    devolverDocumentos(documentos);
  });

  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento);

    const documento = await encontrarDocumento(nomeDocumento);

    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    const atualizacao = await atualizaDocumento(nomeDocumento, texto);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto_duplicado_para_todos", texto);
    }
  });

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente ${socket.id} desconectado!
        Motivo: ${motivo}`);
  });
});
