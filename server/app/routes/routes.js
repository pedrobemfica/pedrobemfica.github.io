const jwt = require('jsonwebtoken');
const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb');
const path = require('path');
const fs = require('fs');

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'fileUploadDB';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));

const SECRET_KEY = 'your_secret_key';

const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Routes
app.post('/user', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/schedule', async (req, res) => {
    try {
      const { userId, date, task } = req.body;
      const newSchedule = new Schedule({ userId, date, task });
      await newSchedule.save();
      res.status(201).json(newSchedule);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const bucket = new GridFSBucket(db);

        const uploadStream = bucket.openUploadStream(req.file.originalname);
        uploadStream.end(req.file.buffer);

        uploadStream.on('finish', () => {
            res.status(200).send('File uploaded successfully.');
        });

        uploadStream.on('error', (err) => {
            console.error('Error uploading file:', err);
            res.status(500).send('Error uploading file.');
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        res.status(500).send('Error connecting to database.');
    } finally {
        await client.close();
    }
});

