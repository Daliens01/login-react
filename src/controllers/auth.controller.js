import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {createAccessToken} from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import { SECRET_TOKEN } from "../config.js"

export const register = async (req, res)=>{
    const {username,email,password} = req.body
    try {
        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(["the email is already in use"])
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

export const login = async (req, res)=>{
  const {email,password} = req.body
  try {
    const userFound =  await User.findOne({email})
    if (!userFound) return res.status(400).json({message: "user not found"})

    const isMatch = await bcrypt.compare(password,userFound.password) 
    if(!isMatch) return res.status(400).json({message: "incorrect credentials"})

    const token = await createAccessToken({id: userFound._id})
    res.cookie("token", token)
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt
    })
 } catch (error) {
  res.status(500).json({message: error.message})
  
 }
}
export const logout =(req, res)=>{
  res.cookie("token","", {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const profile = async (req, res)=>{
  const userFound = await User.findById(req.user.id)
  if(!userFound) return res.status(400).json({message: "user not found"})

  return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt
    })
}

export const verifyToken = async (req, res) =>{
  const {token} = req.cookies

  if(!token) return res.status(401).json({ message: "unauthorized"})
    jwt.verify(token, SECRET_TOKEN,async(err, user)=>{
      if(err) return res.status(401).json({ message: "unauthorized"})
        const userFound = await User.findById(user.id)
      if(!userFound) return res.status(401).json({ message: "unauthorized"})

        return res.json({
          id: userFound._id,
          username: userFound.username,
          email: userFound.email
        })
    })
}