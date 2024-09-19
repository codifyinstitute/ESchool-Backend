const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
require('./config/db')

app.get('/', (req, res) => res.send('<h1 style="display:flex;height: 100%;align-items: center;justify-content: center;margin:0;">Server Is Running!!!!</h1>'));

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));