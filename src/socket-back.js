import {
  adicionarDocumento,
  atualizarDocumento,
  deletarDocumento,
  encontrarDocumento,
  obterDocumentos,
} from "./documentosDB.js";
import io from "./server.js";

io.on("connection", (socket) => {
  socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await obterDocumentos();

    devolverDocumentos(documentos);
  });

  socket.on("adicionar_documento", async (nome) => {
    //const nomeNormalizado = nome.toLowerCase();

    const documentoExiste = (await encontrarDocumento(nome)) !== null;

    if (documentoExiste) {
      socket.emit("documento_existente", nome);
    } else {
      const resultado = await adicionarDocumento(nome);

      if (resultado.acknowledged) {
        io.emit("adicionar_documento_interface", nome);
      }
    }
  });

  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento);

    const documento = await encontrarDocumento(nomeDocumento);

    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    const atualizacao = await atualizarDocumento(nomeDocumento, texto);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto_duplicado_para_todos", texto);
    }
  });

  socket.on("deletar_documento", async (nome) => {
    const resultado = await deletarDocumento(nome);

    if (resultado.deletedCount) {
      io.emit("deletar_documento_sucesso", nome);
    }
  });

  /*socket.on("disconnect", (motivo) => {
    console.log(`Cliente ${socket.id} desconectado! Motivo: ${motivo}`);
  });*/
});
