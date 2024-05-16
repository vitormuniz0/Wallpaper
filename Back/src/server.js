const express = require('express');

const app = express();


app.use(express.json);

app.listen(3336 , () => console.log("Servidor Rodando https://localhost:3336"));