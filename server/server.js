// Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './Schema/User.js'; // Ensure the Schema/User.js exists and is correct
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import { PythonShell } from 'python-shell';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Workaround for __dirname in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());
app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE' }));

// MongoDB Connections
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Validation regex
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// Generate username
const generate_username = async (email) => {
  let username = email.split('@')[0];
  const username_exist = await User.exists({ username });
  if (username_exist) {
    username += nanoid().substring(0, 5);
  }
  return username;
};

// Format user data for response
const formatted_data = (user) => {
  const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);
  return {
    access_token,
    username: user.username,
    email: user.email,
  };
};

// Authentication Routes
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !emailRegex.test(email)) {
      return res.status(403).json({ error: 'Enter a valid email' });
    }
    if (!passwordRegex.test(password)) {
      return res.status(403).json({ error: 'Password must contain a number and uppercase letter' });
    }

    const hashed_password = await bcrypt.hash(password, 10);
    const username = await generate_username(email);
    const user = new User({ email, password: hashed_password, username });

    await user.save();
    res.status(200).json(formatted_data(user));
  } catch (err) {
    if (err.code === 11000) {
      return res.status(500).json({ error: 'Email or Username already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ error: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ error: 'Incorrect password' });
    }

    res.status(200).json(formatted_data(user));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Face Recognition API
app.post('/api/capture', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const options = {
    mode: 'text',
    pythonPath: 'python',
    scriptPath: path.resolve(__dirname, 'python'),
    args: [name],
  };

  const pyshell = new PythonShell('capture_photos.py', options);

  pyshell.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.error) return res.status(500).json({ error: data.error });
      if (data.success === false) return res.status(400).json({ message: data.message });
      if (data.success === true) return res.json({ message: data.message });
    } catch (e) {
      console.log('Python script raw message:', message);
    }
  });

  pyshell.on('error', (err) => {
    console.error('Python script error:', err);
    res.status(500).json({ error: 'Failed to execute capture script' });
  });

  pyshell.on('close', () => {
    console.log('Python script finished');
  });
});

app.post('/api/recognize', (req, res) => {
  const options = {
    mode: 'text',
    pythonPath: 'python',
    scriptPath: path.resolve(__dirname, 'python'),
  };

  PythonShell.run('recognize_face.py', options)
    .then(() => res.json({ message: 'Recognition started' }))
    .catch((err) => res.status(500).json({ error: 'Failed to start recognition', details: err.message }));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
