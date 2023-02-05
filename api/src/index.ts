import path from 'node:path';
import http from 'node:http';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { router } from './router';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

// fazendo a conexão com o mongodb através do mongoose;
// no mongo conseguimos estabelecer uma comunicação do nosso código com o banco de dados através de uma URL;
mongoose.connect('mongodb://localhost:27017')
  // o connect retorna uma Promise (promessa);
  // para pegar o resultado de uma promise usa-se o .then;
  .then(() => {
    const port = 3001;

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });

    // quando o usuário estiver acessando o uploadas eu quero que ele resolve isso usando a expressão express.static;
    // pois os arquivos dentro de uploads são estáticos;
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  // para pegar os erros de uma promise usa-se o .catch;
  .catch(() => console.log('erro ao conectar ao mongodb'));

