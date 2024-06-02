# ApiRestFul_TopEspADS_UniLaSalle
API RestFul + CRUD + Node.JS + MongoDB 

Universidade La Salle
Disciplina: Tópicos Especiais em Ads 
Semestre: 2024/01
Prof. Fausto N. da Silva Vanin 
Aluno: Keoma da Silva 
Matrícula: 202122405


API Para Cadastro de Alunos 
A atividade avaliativa consiste no desenvolvimento de uma  API REST com conexão ao banco de dados não relacional Mongodb (noSQL).

Visão Geral:
A funcionalidade desta API é cadastrar alunos em collections na base de dados com nome, idade, curso e e-mail, sendo que o cadastro do curso propõe uma sub-collection com o nome do curso, semestre, tipo de curso e se foi finalizado ou não. O tipo de entrada de dados em JSON, feito através do Postman. 

Fiz o desenvolvimento apenas do backend, então a entrada de dados e leitura de dados é feita através do Postman, utilizando os métodos POST, PUT, DEL e GET, satisfazendo uma das exigências do trabalho que é o chamado CRUD [CREATE, READ, UPDATE e DELETE].

Portas:
A API está rodando na porta 8000 e a conexão com o Mongo DB na porta padrão 27017 em localhost.

Dependências:
	As dependências utilizadas nesse projeto são: 
body-parser
chartjs-node-canvas
cors
express
mongodb
mongoose
nodemon

Banco de Dados:
	Para a realização do projeto foi utilizado o banco de dados não relacional Mongo DB (noSQL) e utilizado o terminal CMDER para comandos.

Gráfico:
	Também é possível gerar um gráfico com os dados armazenados na base de dados. No exemplo, o gráfico correlaciona os nomes dos alunos com suas idades.
 A rota para gerar o gráfico é: http://localhost:8000/api/grafico

Rotas:

POST: http://localhost:8000/aluno
PUT:  http://localhost:8000/aluno/663c60dd1255e884049cf07d
DEL: http://localhost:8000/aluno/663c4887929b5fc1e2617a56
GET: http://localhost:8000/aluno/663c5798acbe0537237af629
	
Sendo que a seleção do aluno é feita através de uma ID que é gerada automaticamente pelo sistema.

