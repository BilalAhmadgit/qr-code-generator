const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
