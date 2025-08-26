var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer'); // Adicionado o Multer

var app = express();

// Configuração do Multer
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ------------------------------------------------------------------
// ----> INÍCIO DA LÓGICA DO ENDPOINT DE METADADOS DE ARQUIVO <----

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // O middleware 'multer' processa o arquivo e o disponibiliza em req.file
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extrai os metadados do objeto req.file
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// ----> FIM DA LÓGICA DO ENDPOINT <----
// ------------------------------------------------------------------

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
