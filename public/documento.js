import { emitirTextoEditor } from "./socket-front-documento.js"


const textoEditor = document.getElementById('editor-texto')

textoEditor.addEventListener('keyup', () => {
    //console.log(textoEditor.value)
    emitirTextoEditor(textoEditor.value)
})

function atualizaTextoEditor(texto) {
    //console.log(texto)
    textoEditor.value = texto
}

export { atualizaTextoEditor }