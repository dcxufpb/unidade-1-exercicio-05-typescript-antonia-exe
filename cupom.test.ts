const cupom = require('./cupom');

function verificaCampoObrigatorio(mensagemEsperada: string) {
  try {
    cupom.dados_loja();
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
  }
}

test('Loja Completa', () => {
  expect(cupom.dados_loja()).toBe(
    `Arcos Dourados Com. de Alimentos LTDA
Av. Projetada Leste, 500 EUC F32/33/34
Br. Sta Genebra - Campinas - SP
CEP:13080-395 Tel (19) 3756-7408
Loja 1317 (PDP)
CNPJ: 42.591.651/0797-34
IE: 244.898.500.113
`);
});

test('Nome vazio', () => {
  cupom.dados.nome_loja = "";
  verificaCampoObrigatorio(`O campo nome da loja é obrigatório`);
  cupom.dados.nome_loja = "Arcos Dourados Com. de Alimentos LTDA";
});

test('Logradouro vazio', () => {
  cupom.dados.logradouro = "";
  verificaCampoObrigatorio(`O campo logradouro do endereço é obrigatório`);
  cupom.dados.logradouro = "Av. Projetada Leste";
});

test('Número zero', () => {
  cupom.dados.numero = 0;
  expect(cupom.dados_loja()).toBe(
    `Arcos Dourados Com. de Alimentos LTDA
Av. Projetada Leste, s/n EUC F32/33/34
Br. Sta Genebra - Campinas - SP
CEP:13080-395 Tel (19) 3756-7408
Loja 1317 (PDP)
CNPJ: 42.591.651/0797-34
IE: 244.898.500.113
`);
  cupom.dados.numero = 500;
});

test('Município vazio', () => {
  cupom.dados.municipio = "";
  verificaCampoObrigatorio(`O campo município do endereço é obrigatório`);
  cupom.dados.municipio = "Campinas";
});

test('Estado vazio', () => {
  cupom.dados.estado = "";
  verificaCampoObrigatorio(`O campo estado do endereço é obrigatório`);
  cupom.dados.estado = "SP";
});

test('CNPJ vazio', () => {
  cupom.dados.cnpj = "";
  verificaCampoObrigatorio(`O campo CNPJ da loja é obrigatório`);
  cupom.dados.cnpj = "42.591.651/0797-34";
});

test('Inscrição estadual vazia', () => {
  cupom.dados.inscricao_estadual = "";
  verificaCampoObrigatorio(`O campo inscrição estadual da loja é obrigatório`);
  cupom.dados.inscricao_estadual = "244.898.500.113";
});

test('Exercício 2 - customizado', () => {

  cupom.dados.nome_loja = "Magic Box";
  cupom.dados.logradouro = "Baker St";
  cupom.dados.numero = 221;
  cupom.dados.complemento = "EDA A24/25/26";
  cupom.dados.bairro = "Marylebone";
  cupom.dados.municipio = "Sunnydale";
  cupom.dados.estado = "CA";
  cupom.dados.cep = "79297";
  cupom.dados.telefone = "(213) 70374-7092";
  cupom.dados.observacao = "Loja TW (BTVS)";
  cupom.dados.cnpj = "98.650.809/0001-63";
  cupom.dados.inscricao_estadual = "55021852-1";

  let expected = "Magic Box\n";
  expected += "Baker St, 221 EDA A24/25/26\n";
  expected += "Marylebone - Sunnydale - CA\n";
  expected += "CEP:79297 Tel (213) 70374-7092\n";
  expected += "Loja TW (BTVS)\n";
  expected += "CNPJ: 98.650.809/0001-63\n";
  expected += "IE: 55021852-1\n";
  
  expect(cupom.dados_loja()).toBe(expected);
  
});
