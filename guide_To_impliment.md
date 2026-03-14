# Step-by-Step Implementation Guide — surfriding backend

Complete the following steps in order. Each step is short, clear, and testable.

---

## PHASE 1: PROJECT SETUP & DEPENDENCIES
create a new folder named surfriding and imliment this project in it
### Step 1: Install required npm packages
```powershell
cd d:\surfriding\backend
npm install express mongoose bcryptjs jsonwebtoken multer dotenv cors express-rate-limit express-async-errors express-mongo-sanitize 

```

**Verify:** `npm list | findstr "express mongoose bcryptjs"` (check output includes these packages)

---

### Step 2: Create `.env` file
**File:** `backend/.env`

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/surfriding
JWT_SECRET=your_jwt_secret_key_here_min_32_chars
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
UPLOAD_DIR=./uploads
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

**Action:** Create `.env` (copy `.env` and fill real values)

---

### Step 3: Create `.gitignore` updates
**File:** `backend/.gitignore`

```
node_modules/
.env
.env
uploads/
*.log
dist/
coverage/
```

---

## PHASE 2: CONFIG & DATABASE CONNECTION

### Step 4: Create `config/index.js`
**File:** `backend/config/index.js`

```javascript
require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL,
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',

 
};
```

---

### Step 5: Create `config/db.js` (MongoDB connection)
**File:** `backend/config/db.js`

```javascript
const mongoose = require('mongoose');
const config = require('./index');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## PHASE 3: MODELS (Mongoose schemas)

### Step 6: Create `models/User.js`
**File:** `backend/models/User.js`

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // exclude from queries by default
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

---

### Step 7: Create `models/Equipment.js`
**File:** `backend/models/Equipment.js`

```javascript
const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Equipment name is required'] },
    description: String,
    pricePerDay: { type: Number, required: [true, 'Price per day is required'] },
    images: [{ type: String }], // store file paths like /uploads/equipment/xxx.jpg
    available: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Equipment', equipmentSchema);
```

---

### Step 8: Create `models/Booking.js`
**File:** `backend/models/Booking.js`

```javascript
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
    startDate: { type: Date, required: [true, 'Start date is required'] },
    endDate: { type: Date, required: [true, 'End date is required'] },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    totalPrice: Number,
  },
  { timestamps: true }
);

// Validation: endDate must be after startDate
bookingSchema.pre('save', function (next) {
  if (this.endDate <= this.startDate) {
    throw new Error('End date must be after start date');
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
```

---

## PHASE 4: MIDDLEWARE

### Step 9: Create `middleware/errorHandler.js` (centralized error handling)
**File:** `backend/middleware/errorHandler.js`

```javascript
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(status).json(response);
};

module.exports = errorHandler;
```

---

### Step 10: Create `middleware/authMiddleware.js`
**File:** `backend/middleware/authMiddleware.js`

```javascript
const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header: "Bearer <token>"
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // { userId, role, iat, exp }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Optional: Role-based middleware
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

module.exports = { authMiddleware, adminOnly };
```

---

### Step 11: Create `middleware/uploadMiddleware.js`
**File:** `backend/middleware/uploadMiddleware.js`

```javascript
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = './uploads/equipment';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;
```

---

## PHASE 5: CONTROLLERS

### Step 12: Create `controllers/authController.js`
**File:** `backend/controllers/authController.js`

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Create user
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id, user.role);

    // Return sanitized user (no password)
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find user and select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
```

---

### Step 13: Create `controllers/equipmentController.js`
**File:** `backend/controllers/equipmentController.js`

```javascript
const Equipment = require('../models/Equipment');
const fs = require('fs');
const path = require('path');

const getAllEquipment = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const equipment = await Equipment.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Equipment.countDocuments();

    res.status(200).json({
      success: true,
      data: equipment,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

const getEquipmentById = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }
    res.status(200).json({ success: true, data: equipment });
  } catch (error) {
    next(error);
  }
};

const createEquipment = async (req, res, next) => {
  try {
    const { name, description, pricePerDay } = req.body;

    if (!name || !pricePerDay) {
      return res.status(400).json({
        success: false,
        message: 'Name and price per day are required',
      });
    }

    const images = req.files ? req.files.map(f => `/uploads/equipment/${f.filename}`) : [];

    const equipment = await Equipment.create({
      name,
      description,
      pricePerDay,
      images,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: 'Equipment created successfully',
      data: equipment,
    });
  } catch (error) {
    next(error);
  }
};

const updateEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    const { name, description, pricePerDay, available } = req.body;
    if (name) equipment.name = name;
    if (description) equipment.description = description;
    if (pricePerDay) equipment.pricePerDay = pricePerDay;
    if (available !== undefined) equipment.available = available;

    // Handle new images
    if (req.files && req.files.length > 0) {
      equipment.images = req.files.map(f => `/uploads/equipment/${f.filename}`);
    }

    await equipment.save();

    res.status(200).json({
      success: true,
      message: 'Equipment updated successfully',
      data: equipment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    // Delete image files
    equipment.images.forEach(imagePath => {
      const filePath = path.join(__dirname, '..', imagePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await Equipment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Equipment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};
```

---

### Step 14: Create `controllers/bookingController.js`
**File:** `backend/controllers/bookingController.js`

```javascript
const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');

const createBooking = async (req, res, next) => {
  try {
    const { equipmentId, startDate, endDate } = req.body;

    // Validation
    if (!equipmentId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Equipment ID, start date, and end date are required',
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date',
      });
    }

    // Check if equipment exists
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    // Check for overlapping bookings
    const overlapping = await Booking.findOne({
      equipment: equipmentId,
      status: 'confirmed',
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } },
      ],
    });

    if (overlapping) {
      return res.status(400).json({
        success: false,
        message: 'Equipment is not available for the selected dates',
      });
    }

    // Calculate total price
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * equipment.pricePerDay;

    const booking = await Booking.create({
      user: req.user.userId,
      equipment: equipmentId,
      startDate: start,
      endDate: end,
      totalPrice,
      status: 'confirmed',
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate('equipment')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user').populate('equipment');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Only allow owner or admin to update
    if (booking.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const { status } = req.body;
    if (status && ['pending', 'confirmed', 'cancelled'].includes(status)) {
      booking.status = status;
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Only allow owner or admin to delete
    if (booking.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
```

---

### Step 15: Create `controllers/userController.js`
**File:** `backend/controllers/userController.js`

```javascript
const User = require('../models/User');

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: user._id } });
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
      user.email = email;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.userId);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount,
};
```

---

## PHASE 6: ROUTES

### Step 16: Create `routes/authRoutes.js`
**File:** `backend/routes/authRoutes.js`

```javascript
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
```

---

### Step 17: Create `routes/userRoutes.js`
**File:** `backend/routes/userRoutes.js`

```javascript
const express = require('express');
const { getProfile, updateProfile, deleteAccount } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfile);
router.delete('/me', authMiddleware, deleteAccount);

module.exports = router;
```

---

### Step 18: Create `routes/equipmentRoutes.js`
**File:** `backend/routes/equipmentRoutes.js`

```javascript
const express = require('express');
const {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} = require('../controllers/equipmentController');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getAllEquipment);
router.get('/:id', getEquipmentById);
router.post('/', authMiddleware, adminOnly, upload.array('images', 5), createEquipment);
router.put('/:id', authMiddleware, adminOnly, upload.array('images', 5), updateEquipment);
router.delete('/:id', authMiddleware, adminOnly, deleteEquipment);

module.exports = router;
```

---

### Step 19: Create `routes/bookingRoutes.js`
**File:** `backend/routes/bookingRoutes.js`

```javascript
const express = require('express');
const {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/my', authMiddleware, getMyBookings);
router.get('/:id', authMiddleware, getBookingById);
router.put('/:id', authMiddleware, updateBooking);
router.delete('/:id', authMiddleware, deleteBooking);

module.exports = router;
```

---

## PHASE 7: APP & SERVER

### Step 20: Create `app.js` (Express app setup with middleware)
**File:** `backend/app.js`

```javascript
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');

const config = require('./config');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: config.CLIENT_URL, credentials: true }));

const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX,
  message: 'Too many requests from this IP',
});

app.use('/api/', limiter);
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging


// Static files for uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check endpoint
app.get('/api/healthz', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
```

---

### Step 21: Create `server.js` (Start server)
**File:** `backend/server.js`

```javascript
const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config');

// Connect to MongoDB
connectDB();

const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT} (${config.NODE_ENV})`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
```

---


## PHASE 11: FRONTEND INTEGRATION

### Step 27: Update `frontend/src/services/api.js`

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

### Step 28: Update auth service in `frontend/src/services/auth.service.js`

```javascript
import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => localStorage.removeItem('token'),
};

export default authService;
```

---

## FINAL CHECKLIST

✅ All 30 steps completed
✅ Project structure set up
✅ MongoDB models created
✅ Authentication (JWT + bcrypt)
✅ File upload (Multer)
✅ CRUD for Equipment, Booking, User
✅ Error handling & validation

✅ Frontend integration ready
✅ Production ready (Dockerfile, .env)

Now integrate with your frontend and deploy! 🚀
```

---

## 🎯 SUMMARY — Your Implementation Roadmap

| Phase | Steps | Time Est. |
|-------|-------|-----------|
| 1. Setup | 1-3 | 15 min |
| 2. Config | 4-5 | 10 min |
| 3. Models | 6-8 | 20 min |
| 4. Middleware | 9-11 | 25 min |
| 5. Controllers | 12-15 | 40 min |
| 6. Routes | 16-19 | 20 min |
| 7. App & Server | 20-21 | 15 min |
| 8. Scripts | 22 | 5 min |

| 10. Verification | 25-26 | 30 min |
| 11. Frontend | 27-28 | 20 min |
| 12. Production | 29-31 | 20 min |
| **Total** | **31 steps** | **~4.5 hours** |

---

## ✅ Success Criteria

After completing all 31 steps, you should have:

- ✅ Fully functional REST API with 17 endpoints
- ✅ JWT-based authentication with role-based access
- ✅ MongoDB database with 3 models (User, Equipment, Booking)
- ✅ File upload handling with Multer
- ✅ Input validation & centralized error handling
- ✅ Security best practices (helmet, CORS, rate limit, sanitize)
- ✅ Frontend integration ready with axios interceptors
- ✅ Production-ready with Docker & environment config
- ✅ Complete documentation & README

---

