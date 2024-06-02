/**
 * Arquivo: index.js
 * Descrição: Atividade Avaliativa API RestFul + CRUD + Node.JS + MongoDB
 * Instituição: Universidade La Salle
 * Curso: Análise e Desenvolvimento de Sistemas
 * Disciplina: Tópicos Especiais em ADS
 * Autor: Keoma da Silva
 * Data: 01/05/2024 
 *  
 */


//Configurações Iniciais
const mongoose = require("mongoose");
const express = require('express');
const boryParser = require('body-parser');
const cors = require("cors");
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

//Inicialização do Express e definição de porta
const app = express();
const port = 8000;

//Configurações da API
const dbName = "alunosdb";
app.use(express.json());

//Monitorar Comunicação via portas
app.listen(port, () => {
    console.log(`A Api está rodando na porta ${port}!`)
});

//Conexão com o Banco de Dados 
mongoose.connect('mongodb://localhost:27017/alunosdb');

//Monitorar conexão
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o banco de dados:'));
db.once('open', () => {
    console.log('Conectado ao Banco de Dados!');
});

// Exportar conexão
module.exports = db;


//Rotas [CRUD - Create, Read, Update, Delete]
//1.Rota teste de comunicação
app.get("/", (req, res) => {
    res.json({ message: "A comunicação está OK!" })
});

//Importação de Rotas
const Aluno = require('./models/aluno');

//2.Rota para inserir um aluno [CREATE]
app.post('/aluno', async (req, res) => {

    try {
        const nome = req.body.nome;
        const idade = req.body.idade;
        const curso = req.body.curso;

        const aluno = new Aluno({ nome, idade, curso });
        await aluno.save();

        res.json({ message: 'Aluno cadastrado com sucesso!', aluno });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar aluno', message: error.message });
    }

});

//3.Rota para editar o aluno [UPDATE]
app.put(`/aluno/:id`, async (req, res) => {
    try {
        const alunoId = req.params.id;
        const nome = req.body.nome;
        const idade = req.body.idade;
        const curso = req.body.curso;

        const aluno = await Aluno.findByIdAndUpdate(alunoId, { nome, idade, curso }, { new: true });

        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json({ message: 'Aluno atualizado com sucesso!', aluno });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar aluno', message: error.message });
    }
});

//4.Rota para deletar um aluno [DELETE]
app.delete('/aluno/:id', async (req, res) => {
    try {
        const alunoId = req.params.id;
        const aluno = await Aluno.findByIdAndDelete(alunoId);

        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json({ message: 'Aluno deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar aluno', message: error.message });
    }
});

//5.Rota para exibir um aluno [READ]
app.get('/aluno/:id', async (req, res) => {
    try {
        const alunoId = req.params.id;
        const aluno = await Aluno.findById(alunoId);

        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json(aluno);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar aluno', message: error.message });
    }
});

//6.Rota para exibir todos os alunos cadastrados [READ]
app.get('/aluno', async (req, res) => {
    try {
        const alunos = await Aluno.find();
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos', message: error.message });
    }
});

//7.Rota para gerar um gráfico dos alunos
const width = 800; // largura do gráfico
const height = 600; // altura do gráfico
const chartCallback = (ChartJS) => {
};
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });

app.get('/api/grafico', async (req, res) => {
    try {
        const alunos = await Aluno.find();
        const nomes = alunos.map(aluno => aluno.nome);
        const idades = alunos.map(aluno => aluno.idade);

        const configuration = {
            type: 'bar',
            data: {
                labels: nomes,
                datasets: [{
                    label: 'Idade dos Alunos',
                    data: idades,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);
    } catch (err) {
        res.status(500).send(err);
    }
});