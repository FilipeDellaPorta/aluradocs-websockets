import { documentosColecao } from "./dbConnect.js";

function obterDocumentos() {
  const documentos = documentosColecao.find().toArray();
  return documentos;
}

function adicionarDocumento(nome) {
  const resultado = documentosColecao.insertOne({
    nome,
    texto: "",
  });

  return resultado;
}

function encontrarDocumento(nome) {
  const documento = documentosColecao.findOne({
    nome: nome,
  });

  return documento;
}

function atualizarDocumento(nome, texto) {
  const atualizacao = documentosColecao.updateOne(
    {
      nome,
    },
    {
      $set: {
        texto,
      },
    }
  );

  return atualizacao;
}

function deletarDocumento(nome) {
  const resultado = documentosColecao.deleteOne({
    nome,
  });

  return resultado;
}

export {
  encontrarDocumento,
  atualizarDocumento,
  obterDocumentos,
  adicionarDocumento,
  deletarDocumento,
};
