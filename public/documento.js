import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js"

const qualUrl = new URLSearchParams(window.location.search)
const nomeDocumento = qualUrl.get('nome')

const tituloDocumento = document.getElementById('titulo-documento')
tituloDocumento.textContent = nomeDocumento || 'Documento sem título'

selecionarDocumento(nomeDocumento)

const textoEditor = document.getElementById('editor-texto')

textoEditor.addEventListener('keyup', () => {
    //console.log(textoEditor.value)
    emitirTextoEditor({
        texto: textoEditor.value, 
        nomeDocumento,
    })
})

function atualizaTextoEditor(texto) {
    //console.log(texto)
    textoEditor.value = texto
}

export { atualizaTextoEditor }