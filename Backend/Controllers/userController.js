import userModel from '../models/userModel.js';
import * as userService from '../services/userServices.js';
import { validationResult } from 'express-validator';


// create users
export const createUserController = async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();
        return res.status(201).json({user,token});

    }catch(error){
        console.error(error);
        return res.status(400).send(error.message);
    }
}

// login users
export const loginUserController = async (req,res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{

        const {email,password} = req.body;
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        const isMatch = await user.isValidPassword(password);
        if(!isMatch) return res.status(404).json({error: "Invalid credentials"});

        const token = await user.generateJWT();
        delete user._doc.password; // remove password from user object
        return res.status(200).json({user,token});

    }catch(error){
        console.error(error);
        return res.status(400).json({error: error.message});
    }
}

export const profileController = async (req, res) => {

    res.status(200).json({
        user: req.user
    });

}