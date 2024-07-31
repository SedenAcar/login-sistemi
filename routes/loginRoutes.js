import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const loginrouter = express.Router();
const secret = 'supersecretkey';

loginrouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    console.log(username +" "+password)
  
    // Kullanıcıyı bul ve şifreyi doğrula
    const user = await User.findOne({ username });

    if(!user){
        return res.status(401).json({message: 'Kullanıcıı bulunamadı'})
    }
    console.log(user)
    const conrtol = await user.comparePassword(password)
    console.log(conrtol)
    if (!user || !conrtol) {
      return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }

    
  
    // JWT oluştur
    const token = jwt.sign({ id: user._id, username: user.username }, secret, {
      expiresIn: '1h'
    });
  
    res.json({ token });
    console.log(token)
  });

loginrouter.post('/control',async (req, res) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(token, secret, async (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      const user = await User.findById(payload.id)
      res.send(user);
      
    });
  } else {
    res.sendStatus(401);
  }
})

export default loginrouter;