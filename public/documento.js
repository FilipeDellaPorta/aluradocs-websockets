import {
  emitirDeletarDocumento,
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-front-documento.js";

const qualUrl = new URLSearchParams(window.location.search);
const nomeDocumento = qualUrl.get("nome");

const tituloDocumento = document.getElementById("titulo-documento");
const textoEditor = document.getElementById("editor-texto");
const botaoExcluir = document.getElementById("excluir-documento");

tituloDocumento.textContent = nomeDocumento || "Documento sem título";

selecionarDocumento(nomeDocumento);

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDocumento,
  });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", () => {
  emitirDeletarDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`Documento ${nome} deletado com sucesso!`);
    window.location.href = "/";
  }
}

export { atualizaTextoEditor, alertarERedirecionar };
