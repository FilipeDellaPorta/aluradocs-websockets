import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js"

const qualUrl = new URLSearchParams(window.location.search)
const nomeDocumento = qualUrl.get('nome')

const tituloDocumento = document.getElementById('titulo-documento')
tituloDocumento.textContent = nomeDocumento || 'Documento sem título'

selecionarDocumento(nomeDocumento)

const textoEditor = document.getElementById('editor-texto')

textoEditor.addEventListener('keyup', () => {
    emitirTextoEditor({
        texto: textoEditor.value, 
        nomeDocumento,
    })
})

function atualizaTextoEditor(texto) {
    textoEditor.value = texto
}

export { atualizaTextoEditor }