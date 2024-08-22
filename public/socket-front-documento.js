import { atualizaTextoEditor } from "./documento.js";

const socket = io();

function selecionarDocumento(nomeDocumento) {
  socket.emit("selecionar_documento", nomeDocumento, (texto) => {
    atualizaTextoEditor(texto);
  });
}

function emitirTextoEditor(objetoDoTextoEditor) {
  socket.emit("texto_editor", objetoDoTextoEditor);
}

socket.on("texto_duplicado_para_todos", (texto) => {
  atualizaTextoEditor(texto);
});

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
});

export { emitirTextoEditor, selecionarDocumento };
