# aplicacaoIncidentes

Essa aplicação é um MPV (Mínimo Produto Viável) de registro de situações de risco (Incidentes) na área de Segurança do Trabalho.

A aplicação tem o objetivo de mostrar o uso da arquitetura MVC em comparação com uma arquitetura monolítica.

Além disso, são utilizados NodeJs com Express e Handlebars, diferentemente de outras aplicações sem o uso de bilbiotecas (uso de linguagem nativa), sem uso de roteamento, separação entre front-end e back end, e Programação Orientada a Objetos, etc.


A Aplicação funciona da seguinte forma:

Inicialmente é necessário executar o servidor de Banco de Dados MySQL.

Dentro da pasta dos arquivos basta executar o comando:

npm start

e acessar um navegador pelo localhost na porta 3000 (localhost:3000)

O sistema irá criar os objetos no Banco de Dados e para fazer o Login é necessário criar seu usuário antes.

O sistema permite o registro de situações de risco (incidentes) cada um com uma gradação de risco com base na matriz de risco GUT (Gravidade, Urgência e Tempo).

Conforme a gradação, cada incidente receberá uma nota e um símbolo de gravidade (Baixo-Verde, Médio-Amarelo e Alto-Vermelho).
