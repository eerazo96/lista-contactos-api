const express = require('express');
const cors = require('cors');

const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'API funcionando correctamente'
  });
});

app.use('/api', contactRoutes);

module.exports = app;
