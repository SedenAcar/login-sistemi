import User from '../models/user.js';

export const createUser = async (req, res) => {
    const user = new User(req.body);

    try {
        const newUser = await user.save();
        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};