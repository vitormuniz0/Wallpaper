import express from 'express';
import connection from './connection/index.js';
import router from './routes/index.js';

// inicializando servidor
const app = express();

// definindo porta
const PORT = 3008;

// indicando que ele utilizara json
app.use(express.json());
app.use(router)

const startServer = async () => {
    try {
        // rodando servidor
        app.listen(PORT, () => {
            console.log(`Servidor Rodando em http://localhost:${PORT}`)
        })
        
        await connection.testConnection();

    } catch (error) {
        console.error('Falha ao iniciar o servidor devido a problemas com a conexão do banco de dados:', error);
        process.exit(1); // Opcional: encerrar o processo se a conexão falhar
    }
}

startServer();

