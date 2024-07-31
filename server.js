import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import loginRoutes from './routes/loginRoutes.js';
import registerRoutes from './routes/registerRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';

//Atamalar
const app = express();
const port = 5500;

//Middleware
app.use(cors({
  origin: 'http://localhost:5500',
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

//MongoDB Bağlantısı
mongoose.connect('mongodb://localhost:27017/userinfo');

// Routes
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/protected', protectedRoutes);
app.use('/control', loginRoutes);

// Sunucuyu Başlatma
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});