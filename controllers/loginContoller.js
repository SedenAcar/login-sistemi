import userSchema from '../models/user.js';

//Kullanıcı adını al
export const getusername = async (req, res) => {
    try{
        const username = await userSchema.findById(req.params.id);
        res.json(username);
    } catch(error){
        res.status(404).json({message:'Kullanıcı bulunamadı!'})

    }
};

//Şifreyi al
export const getuserpassword = async (req, res) => {
    try{
        const userPassword = await userSchema.findById(req.params.id);
        res.json(userPassword);
    } catch(error){
        res.status(404).json({message:'Şifre bulunamadı!'})

    }
};