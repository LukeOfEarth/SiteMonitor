const express = require('express');
const { performMonitoring } = require('./utils/monitor')

const app = express();

const PORT = process.env.PORT ?? 3000;

app.get('/', async (req, res) => {
    console.log('Request received');
    await performMonitoring();
    res.send('Monitoring is underway...')
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));