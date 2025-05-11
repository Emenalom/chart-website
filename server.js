const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('chartImage'), (req, res) => {
  res.sendStatus(200);
});

app.get('/images', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) return res.status(500).send('Error reading images');
    const images = files.map(file => `/uploads/${file}`);
    res.json(images);
  });
});

app.get('/notify', (req, res) => {
  // Placeholder for notification logic
  console.log('New chart uploaded!');
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
