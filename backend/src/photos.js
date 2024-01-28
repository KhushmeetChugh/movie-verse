const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 4000;

// Connect to MongoDB
const mongoURI = 'mongodb+srv://Khushmeet:HN81zh74QFLme6q6@cluster0.jwzic4f.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.use((req, res, next) => {
    console.log("middleware executed");
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Change '/upload' to 'uploads/'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '' + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
});

const File = mongoose.model('File', fileSchema);

app.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        // Save file information to MongoDB
        const newFile = new File({
            filename: req.file.filename,
            path: req.file.path,
        });
        await newFile.save();

        res.status(200).json({ message: 'File upload success' });

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:", PORT);
});
