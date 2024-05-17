import express from 'express';

// inicializando servidor
const app = express();

// definindo porta
const PORT = 3008;

// indicando que ele utilizara json
app.use(express.json());
app.use(cors());

// rodando servidor
app.listen(PORT , () =>{
    console.log(`Servidor Rodando em <http://localhost>:${PORT}`)
})

