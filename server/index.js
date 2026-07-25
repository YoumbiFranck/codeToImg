const express = require('express');
const generateImageRoute = require('./routes/generateImage');
const generateCodeImageRoute = require('./routes/generateCodeImage');
const app = express();
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

app.use(express.json());
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.use('/', generateCodeImageRoute);
app.use('/', generateImageRoute);

app.listen(port, host, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
