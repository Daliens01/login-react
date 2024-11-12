import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {createAccessToken} from "../libs/jwt.js"
export const register = async (req, res)=>{
    const {username,email,password} = req.body
    try {


      const passwordhash = await bcrypt.hash(password,10) //string aleatorio
    const newUser =  new User({
         username,
         email,
         password: passwordhash
     })
 
    const userSaved =  await newUser.save()

    const token = await createAccessToken({id: userSaved._id})
    res.cookie("token", token)
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt
    })
   } catch (error) {
    res.status(500).json({message: error.message})
    
   }
   
    
}
export const login = (req, res)=> res.send("login")