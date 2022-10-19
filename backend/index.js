const dotenv = require("dotenv");
dotenv.config(); // setup dotenv

const express = require('express');
const { uploadOnIpfsServer } = require('./src/service/infura');

const { createServer: createViteServer } = require('vite')
const port = 5000;

async function createServer() {
    const app = express();
    const vite = await createViteServer({
        server: { middlewareMode: 'ssr' }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)

    app.get('/api', (req, res) => {
        res.send('Hello World!')
    })

    app.get('/api/ipfs/upload', async (req, res) => {
        const query = req.query;
        const response = await uploadOnIpfsServer(query);
        res.status(201).json(response);
    });
    
   app.listen(port, () => console.log(`Server started on port ${port}`));
}

createServer()