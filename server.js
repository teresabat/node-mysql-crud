const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_api'
});

// Rota para criar usuário (POST)
app.post('/usuarios', (req, res) => {
    const { nome } = req.body;
    db.query('INSERT INTO usuarios (nome) VALUES (?)', [nome], (err, result) => {
        if (err) return res.status(500).json({ erro: err });
        res.status(201).json({ id: result.insertId, nome });
    });
});

// Rota para listar todos os usuários (GET)
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        res.json(results);
    });
});

// Rota para atualizar usuário (PUT)
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    db.query('UPDATE usuarios SET nome = ? WHERE id = ?', [nome, id], (err) => {
        if (err) return res.status(500).json({ erro: err });
        res.json({ mensagem: 'Usuário atualizado!' });
    });
});

// Rota para excluir usuário (DELETE)
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ erro: err });
        res.json({ mensagem: 'Usuário excluído!' });
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
