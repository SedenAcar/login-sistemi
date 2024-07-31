import express from 'express';
import authenticateJWT from '../middleware/auth.js';

const router = express.Router();

router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'Yetkilendirilmiş erişim sağlandı', user: req.user });
});

export default router;