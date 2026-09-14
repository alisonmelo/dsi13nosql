/* 
INSTRUÇÕES PARA O PROFESSOR ALISON:
1. Crie uma pasta nova no seu computador.
2. Salve este arquivo dentro dela com o nome 'server.js'.
3. Abra o terminal nessa pasta e rode o comando:
   npm init -y
4. Em seguida, instale as dependências:
   npm install express cors redis
5. Altere a string de conexão na linha 14 para a URL do seu Redis Cloud.
6. Rode o servidor:
   node server.js
7. (No HTML redis_demo.html que gerei, mude a variável 'isSimulating' para 'false' na linha 95)
*/

const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
const PORT = 3000;

// Middleware para permitir requisições do frontend (HTML) e entender JSON
app.use(cors());
app.use(express.json());

// SUBSTITUA PELA SUA URL DO REDISLABS/REDIS CLOUD:
const REDIS_URL = 'redis://default:y38T1h3NOk2LnEo3bXxJkXIzMaLVUfME@juniper-spot-knot-93064.db.redis.io:11622';

const redisClient = createClient({
    url: REDIS_URL
});

redisClient.on('error', (err) => console.log('Erro no Cliente Redis', err));
redisClient.on('connect', () => console.log('✅ Conectado ao Servidor Redis!'));

// Conecta o cliente assim que o servidor inicia
redisClient.connect().catch(console.error);


// Rota 1: Ping simples para testar se a API está online
app.get('/ping', (req, res) => {
    console.log('[API] Rota /ping acessada');
    res.json({ status: 'online', message: 'API Node.js respondendo!' });
});

