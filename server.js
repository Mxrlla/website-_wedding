const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.static('public'));

// Configuração do armazenamento com multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');  // Pasta onde as fotos serão salvas
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Nome do arquivo
    }
});

const upload = multer({ storage: storage });

// Rota para a página de upload
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para lidar com o upload
app.post('/upload', upload.single('foto'), (req, res) => {
    res.send('Foto enviada com sucesso!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
