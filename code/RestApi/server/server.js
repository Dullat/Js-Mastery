// server.js - Fixed JSON Server with ES6 modules and LowDB v6
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node'; // Fixed import
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();

// Initialize database with proper async adapter
// Initialize database with proper path
const dbPath = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbPath);
const defaultData = { users: [], posts: [], comments: [] };
const db = new Low(adapter, defaultData);

function convertIdsToString(data) {
  if (!data) return;

  const convert = (obj) => {
    if (Array.isArray(obj)) {
      obj.forEach(convert);
    } else if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (key.toLowerCase() === 'id' || key.toLowerCase().endsWith('id')) {
          if (typeof obj[key] === 'number') {
            obj[key] = String(obj[key]);
          }
        } else if (typeof obj[key] === 'object') {
          convert(obj[key]);
        }
      }
    }
  };

  Object.values(data).forEach(convert);
}

// Read database once at startup
await db.read();
convertIdsToString(db.data);
await db.write();

// Secret key for JWT with fallback
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware to add delay (simulating network latency)
app.use((req, res, next) => {
  // Add delay to simulate real API latency
  setTimeout(() => {
    next();
  }, Math.random() * 1000 + 200); // Random delay between 200-1200ms
});

// Custom middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Custom middleware to handle CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Custom middleware to simulate API key authentication
app.use('/api/protected', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== 'test-api-key-123') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Valid API key required'
    });
  }

  next();
});

app.get('/api/protected', (req, res) => {
  res.json({ 
    message: 'You have accessed a protected route with valid API key',
    timestamp: new Date().toISOString()
  });
});

// Custom middleware to handle JWT authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Access token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};

// Authentication routes
app.post('/auth/register', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Email, password, and name are required'
    });
  }

  // Check if user already exists
  await db.read();
  const existingUser = db.data.users.find(user => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'User already exists'
    });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    email,
    name,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  db.data.users.push(newUser);
  await db.write();

  // Generate JWT token
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({
    message: 'User created successfully',
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
    token
  });
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Email and password are required'
    });
  }

  // Find user
  await db.read();
  const user = db.data.users.find(u => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid credentials'
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Login successful',
    user: { id: user.id, email: user.email, name: user.name },
    token
  });
});

app.post('/auth/logout', (req, res) => {
  // In a real app, you'd invalidate the token in a blacklist
  res.json({ message: 'Logout successful' });
});

// Protected route example
app.get('/auth/profile', authenticateToken, async (req, res) => {
  await db.read();
  const user = db.data.users.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'User not found'
    });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt
  });
});

// File upload endpoints
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'No file uploaded'
    });
  }

  // Get server URL dynamically
  const serverUrl = `${req.protocol}://${req.get('host')}`;

  res.json({
    message: 'File uploaded successfully',
    file: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path,
      url: `${serverUrl}/uploads/${req.file.filename}`
    }
  });
});

app.post('/upload-multiple', upload.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'No files uploaded'
    });
  }

  // Get server URL dynamically
  const serverUrl = `${req.protocol}://${req.get('host')}`;

  const files = req.files.map(file => ({
    originalName: file.originalname,
    filename: file.filename,
    size: file.size,
    mimetype: file.mimetype,
    path: file.path,
    url: `${serverUrl}/uploads/${file.filename}`
  }));

  res.json({
    message: 'Files uploaded successfully',
    files
  });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Search endpoints
app.get('/search/users', async (req, res) => {
  const { q, limit = 10, page = 1 } = req.query;

  await db.read();
  let users = db.data.users;

  if (q) {
    users = users.filter(user =>
      user.name.toLowerCase().includes(q.toLowerCase()) ||
      user.email.toLowerCase().includes(q.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedUsers = users.slice(startIndex, endIndex);

  res.json({
    data: paginatedUsers.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    })),
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: users.length,
      pages: Math.ceil(users.length / limit)
    }
  });
});

app.get('/search/posts', async (req, res) => {
  const { q, limit = 10, page = 1 } = req.query;

  await db.read();
  let posts = db.data.posts;

  if (q) {
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(q.toLowerCase()) ||
      post.body.toLowerCase().includes(q.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedPosts = posts.slice(startIndex, endIndex);

  res.json({
    data: paginatedPosts,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: posts.length,
      pages: Math.ceil(posts.length / limit)
    }
  });
});

// CRUD operations for users
app.get('/users', async (req, res) => {
  await db.read();
  const users = db.data.users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  }));
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const id = String(req.params.id); 
  await db.read();
  const user = db.data.users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'User not found'
    });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  });
});

app.post('/users', async (req, res) => {
  // Add all fields from your db.json user schema
  const { name, email, username, phone, website, address, company } = req.body;
  
  if (!name || !email || !username) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Name, email, and username are required',
      fields: ['name', 'email', 'username']
    });
  }
  
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    username,
    phone: phone || '',
    website: website || '',
    address: address || {},
    company: company || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  await db.read();
  db.data.users.push(newUser);
  await db.write();
  
  res.status(201).json(newUser);
});

app.put('/users/:id', async (req, res) => {
  const id = String(req.params.id);  // Convert to string
  // Include all possible user fields
  const { name, email, username, phone, website, address, company } = req.body;
  
  await db.read();
  const userIndex = db.data.users.findIndex(u => String(u.id) === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ 
      error: 'Not Found', 
      message: 'User not found' 
    });
  }
  
  db.data.users[userIndex] = {
    ...db.data.users[userIndex],
    name: name || db.data.users[userIndex].name,
    email: email || db.data.users[userIndex].email,
    username: username || db.data.users[userIndex].username,
    phone: phone || db.data.users[userIndex].phone,
    website: website || db.data.users[userIndex].website,
    address: address || db.data.users[userIndex].address,
    company: company || db.data.users[userIndex].company,
    updatedAt: new Date().toISOString()
  };
  
  await db.write();
  res.json(db.data.users[userIndex]);
});

app.delete('/users/:id', async (req, res) => {
  const id = String(req.params.id); 

  await db.read();
  const userIndex = db.data.users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'User not found'
    });
  }

  db.data.users.splice(userIndex, 1);
  await db.write();

  res.json({ message: 'User deleted successfully' });
});

// CRUD operations for posts
app.get('/posts', async (req, res) => {
  await db.read();
  const posts = db.data.posts.map(post => {
    const user = db.data.users.find(u => u.id === post.userId);
    return {
      ...post,
      user: user ? { id: user.id, name: user.name, email: user.email } : null
    };
  });
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const id = String(req.params.id); 
  await db.read();
  const post = db.data.posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'Post not found'
    });
  }

  const user = db.data.users.find(u => u.id === post.userId);
  const comments = db.data.comments.filter(c => c.postId === id);

  res.json({
    ...post,
    user: user ? { id: user.id, name: user.name, email: user.email } : null,
    comments: comments || []
  });
});

app.post('/posts', authenticateToken, async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Title and body are required',
      fields: ['title', 'body']
    });
  }

  const newPost = {
    id: Date.now().toString(),
    title,
    body,
    userId: req.user.id,
    createdAt: new Date().toISOString()
  };

  await db.read();
  db.data.posts.push(newPost);
  await db.write();

  res.status(201).json(newPost);
});

app.put('/posts/:id', authenticateToken, async (req, res) => {
  const id = String(req.params.id); 
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Title and body are required',
      fields: ['title', 'body']
    });
  }

  await db.read();
  const postIndex = db.data.posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'Post not found'
    });
  }

  // Check if the user owns the post
  if (db.data.posts[postIndex].userId !== req.user.id) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'You can only edit your own posts'
    });
  }

  db.data.posts[postIndex] = {
    ...db.data.posts[postIndex],
    title,
    body,
    updatedAt: new Date().toISOString()
  };

  await db.write();
  res.json(db.data.posts[postIndex]);
});

app.delete('/posts/:id', authenticateToken, async (req, res) => {
  const id = String(req.params.id); 

  await db.read();
  const postIndex = db.data.posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'Post not found'
    });
  }

  // Check if the user owns the post
  if (db.data.posts[postIndex].userId !== req.user.id) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'You can only delete your own posts'
    });
  }

  db.data.posts.splice(postIndex, 1);

  // Also delete related comments
  db.data.comments = db.data.comments.filter(c => c.postId !== id);

  await db.write();

  res.json({ message: 'Post deleted successfully' });
});

// CRUD operations for comments
app.get('/comments', async (req, res) => {
  await db.read();
  res.json(db.data.comments);
});

app.get('/comments/:id', async (req, res) => {
  const id = String(req.params.id); 
  await db.read();
  const comment = db.data.comments.find(c => c.id === id);

  if (!comment) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'Comment not found'
    });
  }

  res.json(comment);
});

app.post('/comments', async (req, res) => {
  const { body, postId, name, email } = req.body;

  if (!body || !postId) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Body and postId are required',
      fields: ['body', 'postId']
    });
  }

  const newComment = {
    id: Date.now().toString(),
    body,
    postId: postId,
    name: name || 'Anonymous',
    email: email || 'anonymous@example.com',
    createdAt: new Date().toISOString()
  };

  await db.read();
  db.data.comments.push(newComment);
  await db.write();

  res.status(201).json(newComment);
});

// Custom error simulation endpoints
app.get('/error/400', (req, res) => {
  res.status(400).json({
    error: 'Bad Request',
    message: 'This is a simulated 400 error'
  });
});

app.get('/error/401', (req, res) => {
  res.status(401).json({
    error: 'Unauthorized',
    message: 'This is a simulated 401 error'
  });
});

app.get('/error/403', (req, res) => {
  res.status(403).json({
    error: 'Forbidden',
    message: 'This is a simulated 403 error'
  });
});

app.get('/error/404', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'This is a simulated 404 error'
  });
});

app.get('/error/500', (req, res) => {
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'This is a simulated 500 error'
  });
});

// Slow endpoint to test timeouts
app.get('/slow', (req, res) => {
  const delay = parseInt(req.query.delay) || 5000;

  setTimeout(() => {
    res.json({
      message: `Response after ${delay}ms delay`,
      timestamp: new Date().toISOString()
    });
  }, delay);
});

// Rate limiting simulation
const rateLimitMap = new Map();

app.use('/api/rate-limited', (req, res, next) => {
  // Get client IP (considering proxies)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const clientIp = ip.split(',')[0].trim();

  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 10;

  if (!rateLimitMap.has(clientIp)) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + windowMs });
  } else {
    const rateLimit = rateLimitMap.get(clientIp);

    if (now > rateLimit.resetTime) {
      rateLimit.count = 1;
      rateLimit.resetTime = now + windowMs;
    } else {
      rateLimit.count++;
    }

    if (rateLimit.count > maxRequests) {
      return res.status(429).json({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded',
        retryAfter: Math.ceil((rateLimit.resetTime - now) / 1000)
      });
    }
  }

  res.header('X-RateLimit-Limit', maxRequests);
  res.header('X-RateLimit-Remaining', Math.max(0, maxRequests - rateLimitMap.get(clientIp).count));
  res.header('X-RateLimit-Reset', Math.ceil(rateLimitMap.get(clientIp).resetTime / 1000));

  next();
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'File too large (max 5MB)'
      });
    }
    return res.status(400).json({
      error: 'File Upload Error',
      message: error.message
    });
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid Token',
      message: 'The provided authentication token is invalid'
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Expired Token',
      message: 'The authentication token has expired'
    });
  }

  res.status(error.status || 500).json({
    error: error.name || 'Internal Server Error',
    message: error.message || 'Something went wrong'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/`);
  console.log(`📁 Uploads will be saved to ${path.join(__dirname, 'uploads')}`);
  console.log(`🔐 Test API Key: test-api-key-123`);
});

export default app;