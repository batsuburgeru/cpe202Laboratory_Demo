const express = require('express');
require('dotenv').config({path:'./.env'});

const app = express();
app.use(express.json());

const tempRoutes = require('./routes/api/temperature.js');
const auth = require('./routes/api/auth.js');

app.get('/', (req, res) => res.send('API RUNNING'));
// init Middleware
app.use(express.json({ extended: false }));

app.use('/temperature', tempRoutes);
app.use('/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));