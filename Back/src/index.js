import express from 'express';
import connection from './connection/index.js';
import useRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import salvarRouter from './routes/salvarRoutes.js';

// inicializando servidor
const app = express();

// definindo porta
const PORT = 3008;

// indicando que ele utilizara json
app.use(express.json());
app.use(useRouter)
app.use(postRouter)
app.use(salvarRouter)

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

